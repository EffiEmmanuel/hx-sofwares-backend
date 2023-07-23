import express from "express";
import {
  createInvite,
  deleteInviteById,
  deleteInviteByInviteId,
  getInviteById,
  getInviteByInviteId,
  getInvites,
  updateInviteById,
  updateInviteByInviteId,
} from "../controllers/invite.controller.js";
import { verifyUserToken } from "../util/auth.helper.js";

const inviteRouter = express.Router();

// Routes
inviteRouter.post("/", createInvite);
inviteRouter.get("/", verifyUserToken, getInvites);
inviteRouter.get(
  "/get-invite-by-invite-id",
  verifyUserToken,
  getInviteByInviteId
);
inviteRouter.get("/get-invite-by-id", verifyUserToken, getInviteById);
inviteRouter.delete("/delete-invite-by-id", verifyUserToken, deleteInviteById);
inviteRouter.delete(
  "/delete-invite-by-invite-id",
  verifyUserToken,
  deleteInviteByInviteId
);
inviteRouter.patch(
  "/update-invite-by-invite-id",
  verifyUserToken,
  updateInviteByInviteId
);
inviteRouter.patch("/update-invite-by-id", verifyUserToken, updateInviteById);

export default inviteRouter;
