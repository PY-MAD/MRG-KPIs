const router = require("express").Router();
const authController = require("../controller/authController");

//login
router.get("/login",authController.GETloginPage);
router.post("/login",authController.POSTLogin);

//sign up
router.get("/signUp",authController.GETsignUpPage);
router.post("/signUp",authController.POSTSignUp);

//logout
router.get("/logout",authController.GETLogout);


//sender validation
router.get("/validationEmail",authController.senderValidationEmail);

//validation checks
router.get("/validationEmail/:token",authController.GETValidateUser);
router.post("/validationEmail/:token",authController.POSTValidateUser);
module.exports = router;