const router = require("express").Router();
const authController = require("../controller/authController");

router.get("/login",authController.GETloginPage);
router.get("/signUp",authController.GETsignUpPage);


module.exports = router;