const router = require("express").Router();
const mainController = require("../../controller/tanqeebController/tanqeebController");
const { isAuth } = require("../../middleware/authMiddleware");
const orderRouter = require("./orderRoutes");
const jobsAdsRouter = require("./jobsAdsRouter");
router.get("/",isAuth,mainController.dashboard)
router.get("/JobsAds",isAuth,mainController.JobsAds)
router.get("/Orders",isAuth,mainController.orders)
router.get("/Target",isAuth,mainController.target)

router.use("/Orders",isAuth,orderRouter)
router.use("/JobsAds",isAuth,jobsAdsRouter)
module.exports = router;