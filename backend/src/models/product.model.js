/*
  File: src/models/product.model.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Model for managing product-related requests.
  Usage: 
    - Import this file into the controller file
    - Use the exported functions for while needing product-related CRUD operations
*/

import mysql from "mysql2";
import redis from "redis";

import { dbConfig } from "../config/db.config.js";

// if you want to use redis, and you have redis installed, set this to true
const isUsingRedis = false;

/**
 * Handles request to get products base on product type.
 *
 * @param {String} productType - The type of products to get
 * @param {Number} pageSize - The number of products to get
 * @param {Number} startIndex - The offset for the query
 * @returns {Object[]} - Array of products.
 */
const getProducts = (productType, pageSize, startIndex) => {
  console.log("getProducts", productType, pageSize, startIndex);

  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);

    // if productType is "all", get all products, otherwise get products base on productType
    const query =
      productType === "all"
        ? `SELECT * FROM product LIMIT ${pageSize + 1} OFFSET ${startIndex}`
        : `SELECT * FROM product WHERE category = '${productType}' LIMIT ${
            pageSize + 1
          } OFFSET ${startIndex}`;

    connection.query(query, (err, rows) => {
      console.log(rows);
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

/**
 * Handles request to get products base on search keyword.
 *
 * @param {String} keyword - The search keyword
 * @param {Number} pageSize - The number of products to get
 * @param {Number} startIndex - The offset for the query
 * @returns {Object[]} - Array of products.
 */
const getSearchProducts = (keyword, pageSize, startIndex) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);

    connection.query(
      `SELECT * FROM product WHERE title LIKE ? LIMIT ${
        pageSize + 1
      } OFFSET ${startIndex}`,
      [`%${keyword}%`],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

/**
 * Handles request to get product details.
 * If using redis, this function will first check if the product details is in the cache.
 * If the product details is in the cache, it will return it from the cache.
 * or else, it will store the result in the cache.
 *
 * @param {Number} productId - The product id
 * @returns {Object} - Product details.
 */
const getProductDetails = (productId) => {
  return new Promise(async (resolve, reject) => {
    if (!isUsingRedis) {
      console.log("not using redis");
      const connection = mysql.createConnection(dbConfig);
      connection.query(
        "SELECT * FROM product WHERE id = ?",
        [productId],
        (err, rows, fields) => {
          if (err) {
            reject(err);
          }
          resolve(rows[0]);
        }
      );
    } else {
      console.log("using redis");
      // if using redis, check if the product details is in the cache
      // TODO: put redis connection in a separate file, I put it here for simplicity
      const redisClient = redis.createClient();

      redisClient.on("error", (err) => {
        console.log("Error " + err);
      });

      redisClient.connect().then(() => {
        console.log("redis connected");

        redisClient.get(`product:${productId}`).then((data) => {
          if (data) {
            // if product details is in the cache, return it from the cache
            console.log("hit cache, get id:", `product:${productId}`);
            resolve(JSON.parse(data));
          } else {
            console.log("miss cache");

            // if product details is not in the cache, get it from the database
            const connection = mysql.createConnection(dbConfig);
            connection.query(
              "SELECT * FROM product WHERE id = ?",
              [productId],
              (err, rows) => {
                if (err) {
                  reject(err);
                }

                // store the result in the cache
                redisClient.set(
                  `product:${productId}`,
                  JSON.stringify(rows[0])
                );
                resolve(rows[0]);
              }
            );
          }
        });
      });
    }
  });
};

/**
 * Handles request to create a product.
 * This function will return the id of the created product.
 * @param {Object} product - The product details.
 * @returns {Number} - The id of the created product.
 */
const createProduct = (product) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO product SET category = ?,
       title = ?, description = ?, price = ?,
        texture = ?, wash = ?, place = ?, note = ?, 
        story = ?, colors = ?, sizes = ?, main_image = ?,
        images = ?, variants = ?`,
      [
        product["category"],
        product["title"],
        product["description"],
        product["price"],
        product["texture"],
        product["wash"],
        product["place"],
        product["note"],
        product["story"],
        product["colors"],
        product["sizes"],
        product["main_image"],
        product["images"],
        product["variants"],
      ],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.insertId);
      }
    );
  });
};

// export model functions
const productModel = {
  getProducts,
  getSearchProducts,
  getProductDetails,
  createProduct,
};

export default productModel;
