const  express = require("express");
const { route } = require("./listing");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {savedRedirectUrl} = require("../middlewear.js");
const userController = require("../controller/user.js");

router.get("/signup",userController.signupForm);

router.post("/signup" ,wrapAsync(userController.signinForm));


router.get("/login" ,userController.loginForm);

router.post("/login",savedRedirectUrl , passport.authenticate
    ("local" ,{failureRedirect:"/login" ,failureFlash : true,}) ,userController.login);

router.get("/logout",userController.logout);

module.exports = router;