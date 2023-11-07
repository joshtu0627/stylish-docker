/*
  File: src/routes/product.route.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Route for product-related requests.
  Usage: 
    - Import this file into the main route file (src/routes/index.js)
*/

import express from "express";
import multer from "multer";

import productController from "../controllers/product.controller.js";
import uploadToS3 from "../utils/uploadToS3.js";

const memoryStorage = multer.memoryStorage();

const upload = multer({ storage: memoryStorage });

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is product route");
});

// handle get products at api/{version}/product/{productType}
router.get("/all", productController.getAllProducts);

router.get("/women", productController.getWomenProducts);

router.get("/men", productController.getMenProducts);

router.get("/accessories", productController.getAccessoriesProducts);

router.get("/search", productController.getSearchProducts);

router.get("/details", productController.getProductDetails);

// handle create product at api/{version}/product/create
router.post(
  "/create",
  upload.fields([{ name: "main_image", maxCount: 1 }, { name: "images" }]),
  async (req, res) => {
    // upload main image to s3, and get the url
    const mainImageURL = await uploadToS3(req.files["main_image"][0]);

    // upload images to s3, and get the urls
    let imagesURL = await Promise.all(
      req.files["images"].map(async (image) => {
        return await uploadToS3(image);
      })
    );

    // convert imagesURL to string
    const imagesURLString = JSON.stringify(imagesURL);

    // set main_image and images in req.body
    req.body.main_image = mainImageURL;
    req.body.images = imagesURLString;

    // call createProduct controller
    productController.createProduct(req, res);
  }
);

// test multer
router.post("/test", upload.single("main_image"), async (req, res) => {
  const mainImageURL = await uploadToS3(req.files["main_image"][0]);

  req.body.main_image = mainImageURL;

  productController.createProduct(req, res);
});

export default router;
