import { Post, Comment } from "../models/Post.model.js";
import { Customer } from "../models/Customer/Customer.model.js";

export const CreatePost = async (req, res) => {
  const responseType = {};
  const input = req.body;
  try {
    const newPost = new Post({
      Service: input.Service,
      Title: input.Title,
      Content: input.Content,
      Image: input.Image,
      Note: input.Note,
    });
    const save = await newPost.save();
    responseType.message = "Create new post successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Create post failed";
  }
  res.json(responseType);
};

export const UpdatePost = async (req, res) => {
  const input = req.body;
  const responseType = {};
  // check input
  try {
    const update = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: input,
      },
      {
        new: true,
      }
    );

    const save = await update.save();
    responseType.statusText = "Success";
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};
export const DeletePost = async (req, res) => {
  const responseType = {};
  // check input
  try {
    await Post.findByIdAndDelete(req.params.id);
    responseType.message = "Delete successfully";
    responseType.status = 200;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Delete Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};
export const GetPostByService = async (req, res) => {
  const responseType = {};
  const service = req.body.Service;
  // check input
  try {
    const data = await Post.find({ Service: service });
    responseType.message = "Get successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Get Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};
export const GetPosts = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const data = await Post.find();
    responseType.message = "Get successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Get Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

export const getPostById = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const data = await Post.findById(req.params.id);
    responseType.message = "Get successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Get Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get post with limit = 3

export const GetPostLimit = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const data = await Post.find().limit(3);
    responseType.message = "Get successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Get Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

export const CreateComment = async (req, res) => {
  const responseType = {};
  const input = req.body;
  try {
    const newComment = new Comment({
      PostId: input.PostId,
      UserId: input.UserId,
      Name: input.Name,
      Image: input.Image,
      Text: input.Text,
    });
    const save = await newComment.save();
    responseType.message = "Create new comment successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Create comment failed";
  }
  res.json(responseType);
};

// update comment
export const UpdateComment = async (req, res) => {
  const responseType = {};
  const check = await Comment.findOne({ UserId: req.body.UserId });
  // check input
  try {
    if (check) {
      const update = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          Text: req.body.Text,
        },
        {
          new: true,
        }
      );
      const save = await update.save();
      responseType.statusText = "Success";
      responseType.message = "Update successfully";
      responseType.status = 200;
      responseType.value = save;
    }
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// delete comment
export const DeleteComment = async (req, res) => {
  const responseType = {};
  // find comment and check userId

  const check = await Comment.findOne({ UserId: req.body.UserId });
  console.log("USER", req.body.UserId);
  if (check) {
    const respone = await Comment.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    if (respone) {
      responseType.message = "Delete successfully";
      responseType.status = 200;
    } else {
      responseType.statusText = "Error";
      responseType.message = "Delete Failed ";
      responseType.status = 404;
    }
  } else {
    responseType.message = "wrong user";
  }
  res.json(responseType);
};

// get comment
export const GetCommentByIdBlog = async (req, res) => {
  const responseType = {};
  const input = req.query.PostId;

  const data = await Comment.find({ PostId: input });

  if (data.length !== 0) {
    responseType.message = "get comment successfully";
    responseType.status = 200;
    responseType.value = data;
  } else {
    responseType.status = 404;
    responseType.message = "Get comment failed";
  }
  res.json(responseType);
};

export const CountComments = async (req, res) => {
  const responseType = {};
  const input = req.query.PostId;
  const data = await Comment.countDocuments({ PostId: input });
  try {
    responseType.statusText = "Success";
    responseType.message = "Count customer successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// don't use
// export const GetUserByIdInComment = async (req, res) => {
//   const responseType = {};
//   const input = req.query.userId;
//   const check = await Comment.findById({ _id: input });
//   try {
//     const user = await Customer.findById({ _id: check.User });
//     responseType.message = "get user comment successfully";
//     responseType.status = 200;
//     responseType.value = user;
//   } catch (error) {
//     responseType.status = 404;
//     responseType.message = "Get user failed";
//   }
//   res.json(responseType);
// };
