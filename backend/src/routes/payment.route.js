/*
  File: src/routes/payment.route.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Route for payment-related requests.
  Usage: 
    - Import this file into the main route file (src/routes/index.js)
*/

import express from "express";

import paymentController from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is payment route");
});

// handle payment at api/{version}/payment/pay-by-tappay
// use authMiddleware to protect the route and get user object by token
// router.post("/pay-by-tappay", authMiddleware, paymentController.handlePayment);
router.post("/pay-by-tappay", paymentController.handlePayment);

export default router;
