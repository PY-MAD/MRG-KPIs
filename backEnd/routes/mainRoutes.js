const router = require("express").Router();
const mainController = require("../controller/mainController");
const { isAuth } = require("../middleware/authMiddleware");
const {dashboard} = require("../controller/tanqeebController/tanqeebController")
//dashbaord
router.get("/",isAuth,dashboard)

// profile
router.get("/Profile",isAuth, mainController.profile)

//admin
router.get("/Admin",isAuth, mainController.admin)





module.exports = router;