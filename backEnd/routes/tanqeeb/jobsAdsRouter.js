const router = require("express").Router();
const JobsAdsController = require("../../controller/tanqeebController/jobsAdsController");
const { isAuth } = require("../../middleware/authMiddleware");

router.get("/addNewApplication",isAuth,JobsAdsController.GETAddJobsAdsPage);
router.post("/addNewApplication",isAuth,JobsAdsController.POSTAddJobsAdsPage);
//delete applicationJob
router.delete("/delete/:id",JobsAdsController.DeleteJobsAds);

// fetching data for dashboard
router.get("/fetchApplications",JobsAdsController.getData);
module.exports = router;