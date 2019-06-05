const express = require('express');
const authController = require('../controller/auth');
const userController = require('../controller/user');
const validator = require('../validator/authValidator');


const router = express.Router();

//router.get('/' ,postController.getPost);
router.post('/signup',validator.signupValidator,authController.signup);
router.post('/signin',validator.signinValidator,authController.signin);
router.get("/signout",authController.signout);


router.param("userid",userController.userById);
module.exports = router;