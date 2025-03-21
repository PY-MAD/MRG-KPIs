const router = require("express").Router();
const mainController = require("../../controller/tanqeebController/tanqeebController");
const { isAuth } = require("../../middleware/authMiddleware");


router.get("/",isAuth,mainController.dashboard)
router.get("/JobsAds",isAuth,mainController.JobsAds)
router.get("/Orders",isAuth,mainController.orders)
router.get("/Target",isAuth,mainController.target)

module.exports = router;