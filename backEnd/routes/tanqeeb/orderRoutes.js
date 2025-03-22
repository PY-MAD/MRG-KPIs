const router = require("express").Router();
const orderController = require("../../controller/tanqeebController/orderController");


router.get("/:order",orderController.GETordersView);
router.get("/reload/:order",orderController.reFetchData);

module.exports = router;