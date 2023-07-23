import express from "express";
import {
  updateConfigById,
  createConfig,
  deleteConfigById,
  deleteConfigByName,
  getConfigById,
  getConfigByOwnerName,
  getConfigs,
  updateConfigByOwnerName,
} from "../controllers/configs.controller.js";
import { verifyUserToken } from "../util/auth.helper.js";

const configsRouter = express.Router();

// Routes

// GET USER CONFIGS - SAME AS IN YOUR EXISTING SERVER
configsRouter.get("/all_configs", verifyUserToken, getConfigs);
// LOAD CONFIG - SAME AS IN YOUR EXISTING SERVER
configsRouter.get("/load_config/:name", verifyUserToken, getConfigByOwnerName);
// DELETE CONFIG - SAME AS IN YOUR EXISTING SERVER
configsRouter.delete(
  "/delete_config/:name",
  verifyUserToken,
  deleteConfigByName
);
// NEW CONFIG - SAME AS IN YOUR EXISTING SERVER
configsRouter.post("/new_config/:name", verifyUserToken, createConfig);

// IMPORT CONFIG - SAME AS IN YOUR EXISTING SERVER
configsRouter.get("/import_config/:id", verifyUserToken, getConfigById);

configsRouter.delete("/delete-config-by-id", verifyUserToken, deleteConfigById);

configsRouter.patch(
  "/update-config-by-owner-name",
  verifyUserToken,
  updateConfigByOwnerName
);
configsRouter.patch("/update-config-by-id", verifyUserToken, updateConfigById);

export default configsRouter;
