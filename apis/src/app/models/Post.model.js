import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    Service: {
      type: String,
    },
    Title: {
      type: String,
    },
    Content: {
      type: String,
    },
    Note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
