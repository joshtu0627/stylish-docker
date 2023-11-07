/*
  File: src/routes/user.route.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Route for user-related requests.
  Usage: 
    - Import this file into the main route file (src/routes/index.js)
*/

import express from "express";
import passport from "passport";

import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is user route");
});

// handle those user related apis at api/{version}/user/{api}
router.post("/signup", userController.signup);

// handle google signup
router.get(
  "/signup/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/signup/google/callback",
  passport.authenticate("google", {
    failureRedirect: `https://13.236.23.10/api/1.0/`,
  }),
  (req, res) => {
    console.log("user:", req.user);
    res.redirect(
      `https://13.236.23.10/api/1.0/user/profile?user=` +
        JSON.stringify(req.user)
    );
    // res.redirect(`https://localhost:8000/api/1.0/user/profile`);
  }
);

router.post("/signin", userController.signin);

router.get("/profile", authMiddleware, userController.profile);

export default router;
