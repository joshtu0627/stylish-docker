/*
  File: src/index.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Service for payment-related requests.
  Usage: 
    - Import this file into the controller file
    - Use the exported functions for while needing to create a payment
*/

import axios from "axios";

import paymentModel from "../models/payment.model.js";
import { paymentConfig } from "../config/payment.config.js";

/**
 * Handles request to create a new payment.
 *
 * @param {Object} payment - The payment information.
 * @param {Object} user - The user information. (usually from auth middleware)
 * @returns {string} - The order id.
 */
const createPayment = (payment, user) => {
  // generate timestamp
  // yyyy-MM-dd HH:mm:ss
  const date = new Date();
  const timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  payment.timestamp = timestamp;

  // generate random order number for demo
  payment.order_id = Math.floor(Math.random() * 1000000000 + 1).toString();

  // set status to "Processing" initially
  payment.status = "Processing";

  return new Promise(async (resolve, reject) => {
    const post_data = {
      prime: payment.prime,
      partner_key: paymentConfig.partner_key,
      merchant_id: paymentConfig.merchant_id,
      details: "TapPay Test",
      amount: payment.order.total,
      cardholder: {
        phone_number: payment.order.recipient.phone,
        name: payment.order.recipient.name,
        email: payment.order.recipient.email,
      },
      instalments: 0,
      remember: false,
      order_number: payment.order_id,
    };

    /**
     * I create this variable to store the transaction id, so that I can use this variable
     * in to try-catch blocks.
     */
    let transactionId;

    // create transaction
    try {
      console.log("create transaction");
      transactionId = await paymentModel.createTransaction(payment, user);
    } catch (err) {
      reject(err);
    }

    // send request to TapPay
    try {
      const response = await axios.post(
        "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",
        post_data,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": paymentConfig.partner_key,
          },
        }
      );
      console.log(response.data);

      // if payment failed, update transaction status to "Failed"
      if (response.data.status !== 0) {
        await paymentModel.updateTransaction(transactionId, {
          status: "Failed",
        });
        reject(response.data.msg);
      }

      // if payment succeeded, update transaction status to "Paid"
      const result = await paymentModel.updateTransaction(transactionId, {
        status: "Paid",
        credit_card_information: JSON.stringify(response.data.card_info),
      });
      resolve(payment.order_id);
    } catch (error) {
      reject(error);
    }
  });
};

// export service object
const PaymentService = {
  createPayment,
};

export default PaymentService;
