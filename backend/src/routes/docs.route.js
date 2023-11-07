/*
  File: src/routes/docs.route.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Route for swagger documentation.
  Usage: 
    - Import this file into the main route file (src/routes/index.js)
*/

import express from "express";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// the swagger document needs require instead of import
const swaggerDocument = require("../swagger.json");

const router = express.Router();

// serve swagger ui at /docs
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
