const express = require("express");
const userController = require("../controller/userContoller");
const isLoggedIn = require("../middleware/loginmiddleware");


const router = express.Router();

router.get("/protected",isLoggedIn, userController.userControllerr);

// routes for google authenticate
router.get("/auth/google/", userController.userAuthenticate);


router.get("/google/callback",userController.authentication)


router.get("/auth/fail/", userController.authenticationFailure)



// logout
router.get("/logout", userController.logoutController)

module.exports = router;
