/*
  File: src/index.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Main server file.
  Usage: 
    - Run this file with node/nodemon/PM2/etc.
*/

import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import routes from "./routes/index.route.js";
import swaggerUi from "swagger-ui-express";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

import "./config/passport.config.js";
import { env } from "./utils/env.js";

// set up https server
// const options = {
//   key: fs.readFileSync("./ssl/private.key"),
//   cert: fs.readFileSync("./ssl/certificate.crt"),
//   ca: fs.readFileSync("./ssl/ca_bundle.crt"),
// };

const app = express();

// const server = https.createServer(options, app);

// enable session
app.use(
  session({
    secret: env.SECRET_KEY,
    name: "database_user",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      domain: "localhost",
    },
  })
);

// enable cors
app.use(cors());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// parse application/json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/1.0", routes);

app.use(
  "/.well-known/pki-validation/CDCEE8C29B672B1C22E8DCADC2F62388.txt",
  (req, res) => {
    res.sendFile("CDCEE8C29B672B1C22E8DCADC2F62388.txt", { root: "./" });
  }
);

app.listen(8000, () => {
  console.log(env.SECRET_KEY);
  console.log("Server is running on port https://127.0.0.1:8000/api/1.0");
  console.log();
  console.log("product api is on https://127.0.0.1:8000/api/1.0/products");
  console.log();
  console.log("user api is on https://127.0.0.1:8000/api/1.0/user");
  console.log();
  console.log("docs api is on https://127.0.0.1:8000/api/1.0/docs");
  console.log();
  console.log("admin api is on https://127.0.0.1:8000/api/1.0/admin");
});
