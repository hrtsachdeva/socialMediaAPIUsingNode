const express = require('express');
const userController = require('../controller/user');
const authController = require('../controller/auth');


const router = express.Router();


router.get("/users",userController.allUsers);
router.get("/user/:userid",authController.requireSignin,userController.getUser);
router.put("/user/:userid",authController.requireSignin,userController.updateUser);
router.delete("/user/:userid",authController.requireSignin,userController.deleteUser);

router.param("userid",userController.userById);
module.exports = router;