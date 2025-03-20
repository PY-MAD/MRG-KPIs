const router = require("express").Router();
const mainController = require("../controller/mainController");
const { isAuth } = require("../middleware/authMiddleware");


router.get("/",isAuth,mainController.dashboard)
router.get("/JobsAds",isAuth,mainController.jobsAds)
router.get("/Orders",isAuth,mainController.orders)

// profile
router.get("/Profile", mainController.profile)





module.exports = router;