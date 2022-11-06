import express from "express";
import {
  CreateComment,
  CreatePost,
  DeletePost,
  GetCommentByIdBlog,
  getPostById,
  GetPostByService,
  GetPostLimit,
  GetPosts,
  GetUserByIdInComment,
  UpdatePost,
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

// get all comment
router.get("/comment/all/", GetCommentByIdBlog);

//get user in comment
router.get("/comment/user", GetUserByIdInComment);

export default router;
