const express = require('express');
const postController = require('../controller/post');
const validator = require('../validator/postValidator');
const authController = require('../controller/auth');
const userController = require('../controller/user');


const router = express.Router();

router.get('/post' ,postController.getPost);
router.post('/post/new/:userid',authController.requireSignin,postController.createPost,validator.createPostValidator);
router.get('/post/by/:userid',authController.requireSignin,postController.postByUser);
router.delete('/post/:postid',authController.requireSignin,postController.isPoster,postController.deletePost)
router.patch('/post/:postid',authController.requireSignin,postController.isPoster,postController.updatePost)

router.param("userid",userController.userById);
router.param("postid",postController.postById);

module.exports = router;