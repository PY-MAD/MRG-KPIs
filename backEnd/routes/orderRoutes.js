const router = require("express").Router();
const orderController = require("../controller/orderController");


router.get("/:order",orderController.GETordersView);

module.exports = router;