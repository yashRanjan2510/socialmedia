const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment } = require("../controllers/postcontroller");
const { isAuthenticated } = require("../middlewares/auth");
const { myProfile } = require("../controllers/usercotroller");
const router=express.Router();


router.route("/post/upload").post( isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost)
.delete(isAuthenticated,deletePost).put(isAuthenticated, updateCaption);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/post/comment/:id").put(isAuthenticated, commentOnPost).delete(isAuthenticated, deleteComment);

module.exports=router