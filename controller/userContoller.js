const express = require("express");
const passport = require("passport");
const auth = require("../utils/auth");
const session = require("express-session");

const userControllerr = async (req, res, next) => {
  try {
    res.send(`hello ${req.user.displayName}`);
  } catch (error) {
    console.log("error");
    return res.status(400).send({
      success: false,
      message: "Error",
    });
  }
};

const userAuthenticate = async (req, res, next) => {
  try {
    // Returning the middleware function to allow passport to handle the authentication process
    passport.authenticate("google", { scope: ["email", "profile"] })(
      req,
      res,
      next
    );
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({
      success: false,
      message: error.message || "Authentication error",
    });
  }
};

const authentication = async (req, res, next) => {
  try {
    passport.authenticate("google", {
      successRedirect: "/user/protected",
      failureRedirect: "/user/auth/fail",
    })(req, res, next); // Call the function with req, res, next
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({
      success: false,
      message: error.message || "Authentication error",
    });
  }
};

const authenticationFailure = async (req, res, next) => {
  try {
    res.status(400).send("authenicate fail");
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({
      success: false,
      message: error.message || "Authentication error",
    });
  }
};

const logoutController = async (req, res, next) => {
  try {
    // Passport's logout method
    await req.logout((err) => {
      if (err) {
        return next(err);
      }
      // Destroy the session after logout
      req.session.destroy((error) => {
        if (error) {
          return next(error);
        }
        res.send("Logout successful");
      });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  userControllerr,
  userAuthenticate,
  authenticationFailure,
  authentication,
  logoutController
};
