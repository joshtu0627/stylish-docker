/*
  File: src/controllers/payment.controller.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Controller for manageing payment-related requests.
  Usage: 
    - Import this file into the router file
    - Use the exported functions for each route
*/

import paymentService from "../services/payment.service.js";

/**
 * Handles request to get product details by id.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body - the payment information.
 * @param {string} req.user - the user information. (passed from auth middleware)
 * @returns {Object} - Response payload.
 * @returns {string} - Response payload.data - The product id.
 */
const handlePayment = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("list", req.body.list);
    // create payment by payment service
    const orderId = await paymentService.createPayment(req.body, req.user);

    // return order id
    const responsePayload = {
      data: {
        number: orderId,
      },
    };
    res.status(200).send(responsePayload);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// export controller functions
const paymentController = {
  handlePayment,
};

export default paymentController;
