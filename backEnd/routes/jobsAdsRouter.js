const router = require("express").Router();
const jobsAdsController = require("../controller/jobsAdsController");
const { isAuth } = require("../middleware/authMiddleware");

router.get("/addNewApplication",isAuth,jobsAdsController.GETAddJobsAdsPage);
router.post("/addNewApplication",isAuth,jobsAdsController.POSTAddJobsAdsPage);
//delete applicationJob
router.delete("/delete/:id",jobsAdsController.DeleteJobsAds);

module.exports = router;