const router = require("express").Router();
const usersController = require("../../controller/adminController/usersController");
// change stateUser
router.put("/changeStateUser/:userId",usersController.updateUser);

//delete user
router.post("/delete/:userId",usersController.deleteUser)

// getUsers
router.get("/users",usersController.getUsers)
module.exports = router;