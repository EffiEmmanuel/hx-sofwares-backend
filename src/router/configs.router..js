import express from "express";
import {
  updateConfigById,
  createConfig,
  deleteConfigById,
  deleteConfigByOwnerName,
  getConfigById,
  getConfigByOwnerName,
  getConfigs,
  updateConfigByOwnerName,
} from "../controllers/configs.controller.js";
import { verifyUserToken } from "../util/auth.helper.js";

const configsRouter = express.Router();

// Routes
configsRouter.post("/", createConfig);
configsRouter.get("/", verifyUserToken, getConfigs);
configsRouter.get(
  "/get-config-by-owner-name",
  verifyUserToken,
  getConfigByOwnerName
);
configsRouter.get("/get-config-by-id", verifyUserToken, getConfigById);
configsRouter.delete("/delete-config-by-id", verifyUserToken, deleteConfigById);
configsRouter.delete(
  "/delete-config-by-owner-name",
  verifyUserToken,
  deleteConfigByOwnerName
);
configsRouter.patch(
  "/update-config-by-owner-name",
  verifyUserToken,
  updateConfigByOwnerName
);
configsRouter.patch("/update-config-by-id", verifyUserToken, updateConfigById);

export default configsRouter;
