const router = require("express").Router();
const JobsAdsController = require("../../controller/tanqeebController/jobsAdsController");
const { isAuth } = require("../../middleware/authMiddleware");

router.get("/addNewApplication",isAuth,JobsAdsController.GETAddJobsAdsPage);
router.post("/addNewApplication",isAuth,tanqeeb/JobsAdsController.POSTAddJobsAdsPage);
//delete applicationJob
router.delete("/delete/:id",tanqeeb/JobsAdsController.DeleteJobsAds);

module.exports = router;