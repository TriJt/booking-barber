import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    PostId: {
      type: String,
    },
    UserId: {
      type: String,
    },
    Name: {
      type: String,
    },
    Image: {
      type: String,
    },
    Text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

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
    Image: {
      type: [String],
    },
    Like: {
      type: Array,
      default: [],
    },
    Note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", CommentSchema);

const Post = mongoose.model("Post", PostSchema);
export { Post, Comment };
