import express from "express";
import {
  deleteUserById,
  deleteUserByUsername,
  getUserById,
  getUserByUsername,
  getUsers,
  loginUser,
  signupUser,
  updateUserById,
  updateUserByUsername,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../util/auth.helper.js";

const userRouter = express.Router();

// Routes
// LOGIN - SAME AS IN YOUR EXISTING SERVER
userRouter.post("/login", loginUser);
// REGISTER - SAME AS IN YOUR EXISTING SERVER
userRouter.post("/register", signupUser);
userRouter.get("/", verifyUserToken, getUsers);
userRouter.get("/get-user-by-username", verifyUserToken, getUserByUsername);
userRouter.get("/get-user-by-id", verifyUserToken, getUserById);
userRouter.delete("/delete-user-by-id", verifyUserToken, deleteUserById);
userRouter.delete(
  "/delete-user-by-username",
  verifyUserToken,
  deleteUserByUsername
);
userRouter.patch("/update-user-by-id", verifyUserToken, updateUserById);
userRouter.patch(
  "/update-user-by-username",
  verifyUserToken,
  updateUserByUsername
);

export default userRouter;
