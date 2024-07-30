import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { multerMiddleWareHost } from "../../middlewares/multer.js";
import allowedExtensions from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";
import * as postController from "./post.controller.js";
const Postrouter = Router();
// add post
Postrouter.post(
  "/add",
  auth(['user','admin']),
  expressAsyncHandler(postController.addPost)
);

// delete post
Postrouter.delete(
  "/delete",
  auth(),
  expressAsyncHandler(postController.deletePost)
);

Postrouter.get('/userPosts/:userId',expressAsyncHandler(postController.getAllPosts))

export default Postrouter;
