import postModel from "../../../DB/Models/post.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";
import genrateUniqueString from "../../utils/generateUniqueString.js";
import { downloadVideo } from "tiktok-api-downloader";

export const download = async (req, res, next) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ status: false, error: "URL is required" });
  }

  try {
    let response = await downloadVideo(url);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Failed to download video",
    });
  }
};




//======================= ADD POST API ====================

export const addPost = async (req, res, next) => {
  const { title, slug, imageUrl } = req.body;
  const { _id } = req.authUser;
  //create post
  const slugAlreadyAddedBefore = await postModel.findOne({ title, addedBy: _id });
    if (slugAlreadyAddedBefore) {
      return res.status(400).json({
        message: `${title} is already in your list`,
      });
  }

  const post = await postModel.create({
    title,
    slug,
    imageUrl,
    addedBy: _id,
  });

  res.status(201).json({
    success: true,
    message: `${title} Added to your favorites! 👀`,
    data: post,
  });
};

export const deletePost = async (req, res, next) => {
  const { _id } = req.authUser;
  const { postId } = req.body;

  // check post
  const post = await postModel.findOneAndDelete({ addedBy: _id, _id: postId });
  if (!post) return next(new Error("post not found", { cause: 404 }));
  res.status(200).json({
     success: true,
    message: "Deleted successfully",
  });
};

//======================= GET ALL POSTS ====================
export const getAllPosts = async (req, res, next) => {
  const { userId } = req.params;
  const posts = await postModel
    .find({ addedBy: userId })
    .sort({ createdAt: -1 });
  res.status(200).json({ message: "done", data: posts });
};
