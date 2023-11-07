/*
  File: src/models/payment.model.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Model for managing payment-related requests.
  Usage: 
    - Import this file into the controller file
    - Use the exported functions for while needing payment-related CRUD operations
*/

import mysql from "mysql2";

import { dbConfig } from "../config/db.config.js";

/**
 * Handles request to create a new transaction.
 *
 * @param {Object} payment - The payment information.
 * @param {Object} user - The user information. (usually from auth middleware)
 * @returns {number} - The transaction id.
 */
const createTransaction = async (payment, user) => {
  const connection = mysql.createConnection(dbConfig);
  console.log("transaction");
  return new Promise(async (resolve, reject) => {
    try {
      await connection.promise().beginTransaction();

      for (const item of payment.order.list) {
        const query = `SELECT * FROM product WHERE id = ?`;
        const values = [item.id];

        const [result, fields] = await connection
          .promise()
          .query(query, values);

        // check if the stock is enough
        const variantsObj = result[0].variants;

        for (let i = 0; i < variantsObj.length; i++) {
          let variant = variantsObj[i];
          console.log(item.color.code, item.size);
          if (
            variant.color_code === item.color.code &&
            variant.size === item.size
          ) {
            if (variant.stock < item.quantity) {
              console.log("not enough stock");
              throw new Error("not enough stock");
            }

            variant.stock -= item.qty;

            const query = `UPDATE product SET variants = ? WHERE id = ?`;
            const values = [JSON.stringify(variantsObj), item.id];
            console.log("variantObj", variantsObj);
            const [result, fields] = await connection
              .promise()
              .query(query, values);
            break;
          }
        }
      }

      const query = `INSERT INTO transaction 
  (timestamp, amount, status, purchase_items, 
    credit_card_information, recipient_information, 
    order_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        payment.timestamp, // timestamp
        payment.amount, // amount
        payment.status, // status
        JSON.stringify(payment.order.list), // purchase_items
        payment.credit_card_information, // credit_card_information
        JSON.stringify(payment.order.recipient), // recipient_information
        payment.order_id, // order_id
        user.id, // user_id
      ];

      const [result, fields] = await connection.promise().query(query, values);
      connection.promise().commit();
      console.log("insertid:", result.insertId);
      resolve(result.insertId);
    } catch (err) {
      await connection.promise().rollback();
      reject(err);
    }
  });
};

/**
 * Handles request to update transaction status.
 *
 * @param {number} transactionId - The transaction id.
 * @param {string} status - The new status.
 * @returns {Object} - The result object.
 */
const updateTransactionStatus = async (transactionId, status) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    const query = `UPDATE transaction SET status = ? WHERE transaction_id = ?`;
    const values = [status, transactionId];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(result);
    });
  });
};

/**
 * Handles request to update transaction.
 *
 * @param {number} transactionId - The transaction id.
 * @param {Object} updatedData - The updated data, in the form of {field: value}.
 * @returns {Object} - The query result object.
 */
const updateTransaction = async (transactionId, updatedData) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    // construct query
    const dataToUpdate = [];
    for (const key in updatedData) {
      dataToUpdate.push(`${key} = '${updatedData[key]}'`);
    }
    const fieldsAndValues = dataToUpdate.join(", ");

    const query = `UPDATE transaction SET ${fieldsAndValues} WHERE transaction_id = ?`;
    const values = [transactionId];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(result);
    });
  });
};

// export model functions
const paymentModel = {
  createTransaction,
  updateTransactionStatus,
  updateTransaction,
};

export default paymentModel;
