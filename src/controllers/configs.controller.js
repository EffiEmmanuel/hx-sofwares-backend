import ConfigsModel from "../models/Configs.model.js";
import ConfigService from "../service/ConfigsService.js";

// Generic messages
const internalServerError =
  "An error occured while we processed your request. Please try again.";

// SERVICE INSTANCES
// Create a new ConfigsService instance
const configsService = new ConfigService(ConfigsModel);

// Create Config
export const createConfig = async (req, res) => {
  const { owner, name, data } = req.body;

  try {
    // Create new config
    const config = await configsService.createConfig({
      owner,
      name,
      data,
    });

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get config by owner name
export const getConfigByOwnerName = async (req, res) => {
  const { owner } = req.body;

  try {
    // Fetch config
    const config = await configsService.getConfigByOwnerName(owner);

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get config by _id
export const getConfigById = async (req, res) => {
  const { _id } = req.body;

  try {
    // Fetch config
    const config = await configsService.getConfigById(_id);

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get configs
export const getConfigs = async (req, res) => {
  try {
    // Fetch configs
    const configs = await configsService.getConfigs();

    // Return a response
    return res
      .status(configs?.status)
      .json({ configs: configs?.configs ?? null, message: configs?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete config by owner name
export const deleteConfigByOwnerName = async (req, res) => {
  const { owner } = req.body;
  try {
    // DELETE config
    const config = await configsService.deleteConfigByOwnerName(owner);

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete config by id
export const deleteConfigById = async (req, res) => {
  const { _id } = req.body;
  try {
    // DELETE config
    const config = await configsService.deleteConfigById(_id);

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update config by id
export const updateConfigById = async (req, res) => {
  const { _id /* Other config fields go here */ } = req.body;
  const updatedDetails = {}; // An object with other config fields
  try {
    // UPDATE config
    const config = await configsService.updateConfigById(_id, updatedDetails);

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update config by owner name
export const updateConfigByOwnerName = async (req, res) => {
  const { owner /* Other config fields go here */ } = req.body;
  const updatedDetails = {}; // An object with other config fields
  try {
    // UPDATE config
    const config = await configsService.updateConfigByOwnerName(
      owner,
      updatedDetails
    );

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};
