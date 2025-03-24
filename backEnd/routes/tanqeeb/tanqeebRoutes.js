const router = require("express").Router();
const mainController = require("../../controller/tanqeebController/tanqeebController");
const { isAuth } = require("../../middleware/authMiddleware");
// routes
const orderRouter = require("./orderRoutes");
const jobsAdsRouter = require("./jobsAdsRouter");
const targetRouter = require("./targetRoutes");
router.get("/",isAuth,mainController.dashboard)
router.get("/JobsAds",isAuth,mainController.JobsAds)
router.get("/Orders",isAuth,mainController.orders)
router.get("/Target",isAuth,mainController.target)

router.use("/Orders",isAuth,orderRouter)
router.use("/JobsAds",isAuth,jobsAdsRouter)
router.use("/Target",isAuth,targetRouter)
module.exports = router;