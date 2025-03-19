const express = require("express");
const router = require("express").Router();
const mainController = require("../controller/mainController");

router.get("/",mainController.dashboard)
router.get("/JobsAds",mainController.jobsAds)
router.get("/Orders",mainController.orders)

// profile
router.get("/Profile", mainController.profile)

//login

module.exports = router;