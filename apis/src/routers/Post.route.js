import express from "express";
import {
  CreateComment,
  CreatePost,
  DeleteComment,
  DeletePost,
  GetCommentByIdBlog,
  getPostById,
  GetPostByService,
  GetPostLimit,
  GetPosts,
  UpdateComment,
  UpdatePost,
  CountComments,
} from "../app/controllers/Post.controller.js";
const router = express.Router();

// add post from admin
router.post("/add", CreatePost);

// update post from admin
router.put("/update/:id", UpdatePost);

// delete post from admin
router.delete("/delete/:id", DeletePost);

// get all post
router.get("/all", GetPosts);

// get all post
router.get("/limit", GetPostLimit);

// get post with name service
router.get("/name-service", GetPostByService);

// get post with id
router.get("/:id", getPostById);

// add comment
router.post("/comment", CreateComment);

// update comment
router.put("/comment/:id", UpdateComment);

//delete comment
router.delete("/comment-del/:id", DeleteComment);

// get all comment
router.get("/comment/all", GetCommentByIdBlog);
// count comment
router.get("/comment/count", CountComments);

// //get user in comment
// router.get("/comment/user/", GetUserByIdInComment);

export default router;
