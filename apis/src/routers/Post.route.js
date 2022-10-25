import express from "express";
import {
  CreatePost,
  DeletePost,
  GetPostByService,
  GetPosts,
  UpdatePost,
} from "../app/controllers/Post.controller";
const router = express.Router();

router.post("/add", CreatePost);

router.put("/update/:id", UpdatePost);

router.delete("/delete/:id", DeletePost);

router.get("/all", GetPosts);

router.get("/name-service", GetPostByService);

export default router;
