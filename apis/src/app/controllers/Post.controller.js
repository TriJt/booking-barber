import Post from "../models/Post.model.js";

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
