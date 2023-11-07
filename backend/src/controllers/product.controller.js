/*
  File: src/controllers/product.controller.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Controller for manageing product-related requests.
  Usage: 
    - Import this file into the router file
    - Use the exported functions for each route
*/

import productModel from "../models/product.model.js";

// set the page size
const PAGE_SIZE = 6;

/**
 * Handles request to get products base on product type.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} productType - The product type, e.g., 'all', 'women', 'men', 'accessories'.
 * @returns {Object} - Response payload.
 * @returns {Object[]} - Response payload.data - Array of products.
 */
const getProducts = async (req, res, productType) => {
  try {
    // get page number from query string, default to 0
    const page = parseInt(req.query.paging) || 0;

    // calculate the start index of the products
    const startIndex = page * PAGE_SIZE;

    // get products from model
    const products = await productModel.getProducts(
      productType,
      PAGE_SIZE,
      startIndex
    );

    // calculate the next page number
    const nextPage = products.length > PAGE_SIZE ? page + 1 : null;

    // construct the response payload
    const result = {
      data: products.slice(0, PAGE_SIZE),
    };

    // add next page number if there is any
    if (nextPage) {
      result.next_paging = nextPage;
    }

    // send response
    res.status(200).send(result);
  } catch (err) {
    console.log(err);

    // send error response
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Handles request to get products base on search keyword.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Response payload.
 * @returns {Object[]} - Response payload.data - Array of products.
 * @returns {number} - Response payload.nextPage - The next page number.
 */
const getSearchProducts = async (req, res) => {
  try {
    // get keyword from query string
    const keyword = req.query.keyword;

    const page = parseInt(req.query.paging) || 0;
    const startIndex = page * PAGE_SIZE;

    const products = await productModel.getSearchProducts(
      keyword,
      PAGE_SIZE,
      startIndex
    );

    const nextPage = products.length > PAGE_SIZE ? page + 1 : null;

    const responsePayload = {
      data: products.slice(0, PAGE_SIZE),
    };

    if (nextPage) {
      responsePayload.next_paging = nextPage;
    }

    res.status(200).send(responsePayload);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Handles request to get product details by id.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Response payload.
 * @returns {Object} - Response payload.data - Product details.
 */
const getProductDetails = async (req, res) => {
  // get product id from query string
  const productId = req.query.id;
  try {
    // get product details from model
    const productDetail = await productModel.getProductDetails(productId);

    // construct response payload
    const responsePayload = {
      data: productDetail,
    };
    res.status(200).send(responsePayload);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Handles request to get product details by id.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} req.body - The product details.
 * @returns {Object} - Response payload.
 * @returns {string} - Response payload.data - The product id.
 */
const createProduct = async (req, res) => {
  try {
    // get product from request body
    let product = req.body;

    // get id from model
    const productId = await productModel.createProduct(product);

    // send response
    res.status(200).send("Product created, id: " + productId);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// export controller functions
const productController = {
  getProducts,
  getSearchProducts,
  getProductDetails,
  createProduct,
  getAllProducts: async (req, res) => getProducts(req, res, "all"),
  getWomenProducts: async (req, res) => getProducts(req, res, "women"),
  getMenProducts: async (req, res) => getProducts(req, res, "men"),
  getAccessoriesProducts: async (req, res) =>
    getProducts(req, res, "accessories"),
};

export default productController;
