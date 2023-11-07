/*
  File: src/routes/index.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Main route file.
  Usage: 
    - Import this file into the main server file (src/index.js)
*/

import express from "express";

import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import docsRouter from "./docs.route.js";
import paymentRouter from "./payment.route.js";
import adminRouter from "./admin.route.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/payment", paymentRouter);
router.use("/admin", adminRouter);

// this route is unused, but it's here for future use, maybe?
router.use("/docs", docsRouter);

// for health check
router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// return a html
router.get("/pay", (req, res) => {
  res.sendFile("checkoutMyself.html", { root: "./" });
});

export default router;
