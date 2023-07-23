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
  const { name } = req.params;
  const { owner, data } = req.body;

  try {
    // Create new config
    let [firstKey] = Object.keys(req.body);

    const config = await configsService.createConfig({
      owner,
      name,
      data: firstKey,
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
  const { name } = req.params;
  const { username } = req.body;

  try {
    // Fetch config
    const config = await configsService.getConfigByOwnerName(name, username);

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
  const { id } = req.params;

  try {
    // Fetch config
    const config = await configsService.getConfigById(id);

    // Return a response
    return res
      .status(config?.status)
      .json({ config: config?.config ?? null, message: config?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get user configs
export const getConfigs = async (req, res) => {
  const { owner } = req.body;
  try {
    // Fetch user configs
    const configs = await configsService.getConfigs(owner);

    // Return a response
    return res
      .status(configs?.status)
      .json({ configs: configs?.configs ?? null, message: configs?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete config by owner name
export const deleteConfigByName = async (req, res) => {
  const { name } = req.params;
  try {
    // DELETE config
    const config = await configsService.deleteConfigByOwnerName(name);

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
