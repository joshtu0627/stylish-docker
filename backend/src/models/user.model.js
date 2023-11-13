/*
  File: src/models/user.model.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Model for managing user-related requests.
  Usage: 
    - Import this file into the controller file
    - Use the exported functions for while needing user-related CRUD operations
*/

import mysql from "mysql2";
import bcrypt from "bcrypt";

import { dbConfig } from "../config/db.config.js";

/**
 * Handles request to create a new user.
 *
 * @param {Object} user - The user information.
 * @returns {number} - The user id.
 */
const signup = async (user) => {
  // hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  // set hashed password
  user.password = hashedPassword;

  const connection = mysql.createConnection(dbConfig);

  // Check if user exist
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [user.email],
      (err, rows) => {
        connection.end();
        if (rows.length > 0) {
          reject("user already exists");
        }
        connection.query(`INSERT INTO user SET ?`, [user], (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.insertId);
        });
      }
    );
  });
};

const signupByGoogle = async (user) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [user.email],
      (err, rows) => {
        if (rows.length > 0) {
          resolve(rows[0]);
        }

        console.log(user);
        connection.query(`INSERT INTO user SET ?`, [user], (err, result) => {
          connection.end();
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      }
    );
  });
};

/**
 * Handles request to login.
 * @param {string} email - The user email.
 * @param {string} password - The user password.
 * @param {string} provider - The user provider.
 * @param {string} accessToken - The user accessToken.
 * @returns {Object} - The user object.
 */
const signin = async (email, password) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
      (err, rows, fields) => {
        connection.end();
        if (err) {
          reject(err);
        }

        if (rows.length === 0) {
          reject("user not found");
        }

        const hashedPassword = rows[0].password;

        // compare password to check if it is correct
        bcrypt.compare(password, hashedPassword).then((result) => {
          if (result) {
            resolve(rows[0]);
          } else {
            reject("wrong password");
          }
        });
      }
    );
  });
};

const signinByGoogle = async (email) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
      (err, rows, fields) => {
        connection.end();
        if (err) {
          reject(err);
        }

        if (rows.length === 0) {
          reject("user not found");
        }

        resolve(rows[0]);
      }
    );
  });
};

/**
 * Handles request to get user by id.
 * (It's used in authMiddleware to see if the user id in the token is valid)
 * @param {number} id - The user id.
 * @returns {Object} - The user object.
 */
const getUserById = async (id) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user WHERE id = ?`, [id], (err, rows) => {
      connection.end();
      if (err) {
        reject(err);
      }

      if (rows.length === 0) {
        reject("wrong token");
      }

      resolve(rows[0]);
    });
  });
};

// export model functions
const userModel = {
  signup,
  signupByGoogle,
  signin,
  signinByGoogle,
  getUserById,
};

export default userModel;
