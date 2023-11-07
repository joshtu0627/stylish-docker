/*
  File: src/controllers/user.controller.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Controller for manageing user-related requests.
  Usage: 
    - Import this file into the router file
    - Use the exported functions for each route
*/

import jwt from "jsonwebtoken";

// import { OAuth2Client } from "google-auth-library";
import axios from "axios";

import userModel from "../models/user.model.js";
import { env } from "../utils/env.js";

/**
 * Handles request to create a new user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} req.body - The user information.
 * @returns {Object} - Response payload.
 * @returns {Object} - Response payload.data - The access token, expire date and user information.
 */
const signup = async (req, res) => {
  // TODO: Implement image upload and provider selection
  // Currently user can't upload their profile picture, and the provider is always native

  // only accept application/json
  if (!req.is("application/json")) {
    return res.status(400).send("only accept application/json");
  }

  // get user information from request body
  const user = req.body;

  // set default user picture for demo
  user.picture =
    "https://ih1.redbubble.net/image.3317721448.0910/st,small,507x507-pad,600x600,f8f8f8.jpg";

  // set default user provider to "native" for demo
  user.provider = "native";

  user.role = "admin";

  try {
    // create user
    user.id = await userModel.signup(user);

    // create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.JWTSECRET, {
      expiresIn: 60 * 60,
    });

    // construct response payload
    const responsePayload = {
      data: {
        access_token: token,
        access_expired: 3600,
        user: {
          id: user.id,
          provider: user.provider,
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
      },
    };
    res.status(200).send(responsePayload);
  } catch (err) {
    if (err === "user already exists") {
      console.log(err);
      res.status(409).send(err);
    } else {
      console.log(err);
      res.status(500).send("server error");
    }
  }
};

const signupByGoogle = async (req, res) => {
  console.log("signup by google");
};

/**
 * Handles request to sign in, and return the access token and user information.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} req.body - The user information.
 * @returns {Object} - Response payload.
 * @returns {Object} - Response payload.data - The access token, expire date and user information.
 */
const signin = async (req, res) => {
  // only accept application/json
  if (!req.is("application/json")) {
    return res.status(400).send("only accept application/json");
  }

  // get user information from request body
  const user = req.body;
  const { email, password, provider, access_token } = user;

  // only accept native or google provider
  if (provider !== "native" && provider !== "google") {
    return res.status(400).send("only accept native or google provider");
  }

  if (provider === "google") {
    if (!access_token) {
      return res.status(400).send("no access token");
    }

    // use axios to send request to google
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?alt=json&access_token=${access_token}`
    );

    // get user information from google response
    const googleUser = googleResponse.data;
    console.log(googleUser);
    if (googleUser.audience !== env.GOOGLE_CLIENT_ID) {
      return res.status(400).send("wrong google client id");
    }

    try {
      const userFromDatabase = await userModel.signinByGoogle(email);
      const token = jwt.sign(
        { _id: userFromDatabase.id },
        process.env.JWTSECRET,
        {
          expiresIn: 60 * 60,
        }
      );
      const responsePayload = {
        data: {
          access_token: token,
          access_expired: 3600,
          user: {
            id: userFromDatabase.id,
            provider: userFromDatabase.provider,
            name: userFromDatabase.name,
            email: userFromDatabase.email,
            picture: userFromDatabase.picture,
          },
        },
      };
      res.status(200).send(responsePayload);
      return;
    } catch (err) {
      if (err === "user not found") {
        return res.status(403).send(err);
      } else {
        console.log(err);
        return res.status(500).send("server error");
      }
    }
  }
  try {
    // TODO: Implement google signin authentication in userModel
    // get user information from database
    const userFromDatabase = await userModel.signin(email, password);

    // use algorithm HS256
    const token = jwt.sign(
      { _id: userFromDatabase.id },
      process.env.JWTSECRET,
      {
        expiresIn: 60 * 60,
      }
    );

    // construct response payload
    const responsePayload = {
      data: {
        access_token: token,
        access_expired: 3600,
        user: {
          id: userFromDatabase.id,
          provider: userFromDatabase.provider,
          name: userFromDatabase.name,
          email: userFromDatabase.email,
          picture: userFromDatabase.picture,
        },
      },
    };
    res.status(200).send(responsePayload);
  } catch (err) {
    if (err === "user not found" || err === "wrong password") {
      console.log(err);
      return res.status(403).send(err);
    } else {
      console.log(err);
      return res.status(500).send("server error");
    }
  }
};

/**
 * Handles request to get user profile.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Response payload.
 * @returns {Object} - Response payload.data - The user information.
 *
 * @middleware authMiddleware - This controller function is protected by authMiddleware.
 *   The middleware extracts the user ID from the JWT token, and stores user information
 *   in 'req.user'.
 */
const profile = async (req, res) => {
  // get user information from request body
  const user = req.user;

  // construct response payload
  const responsePayload = {
    data: {
      provider: user.provider,
      name: user.name,
      email: user.email,
      picture: user.picture,
    },
  };
  res.status(200).send(responsePayload);
};

// export controller functions
const userController = {
  signup,
  signupByGoogle,
  signin,
  profile,
};

export default userController;
