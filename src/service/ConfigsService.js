import bcrypt from "bcryptjs";
import { validateFields } from "../util/auth.helper.js";
import { checkConfigValidity } from "../util/db.helper.js";

export default class ConfigService {
  constructor(HKConfigModel) {
    this.ConfigModel = HKConfigModel;
  }

  // This service creates a new config
  async createConfig(config) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([
      config.owner,
      config.name,
      config.data,
    ]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if user is already signed up
    const configAlreadyExists = await checkConfigValidity(config.owner);

    // If config already exists
    if (configAlreadyExists.status === 409) return configAlreadyExists;

    // If the config is available, then proceed to create config
    const newConfig = await this.ConfigModel.create({
      ...config,
    });

    if (newConfig) {
      return {
        status: 201,
        message: "Config has been created successfully!",
        config: newConfig,
      };
    } else {
      return {
        status: 500,
        message: "An error occured. Please try again",
        config: newConfig,
      };
    }
  }

  // This service GETS a config by their owner name
  async getConfigByOwnerName(owner) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([owner]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any config exists with the owner
    const config = await this.ConfigModel.findOne({
      owner: owner,
    });

    if (!config) {
      return {
        status: 404,
        message: "No config exists with the owner specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched config with owner name ${owner}.`,
      config: config,
    };
  }

  // This service GETS a config by their id
  async getConfigById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any config exists with the _id
    const config = await this.ConfigModel.findOne({
      _id: _id,
    });

    if (!config) {
      return {
        status: 404,
        message: "No config exists with the id specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched config with _id ${_id}.`,
      config: config,
    };
  }

  // This service GETS all configs
  async getConfigs() {
    // Fetch all configs
    const configs = await this.ConfigModel.find({});

    return {
      status: 200,
      message: `All configs fetched.`,
      configs: configs,
    };
  }

  // This service DELETES config by owner name
  async deleteConfigByOwnerName(owner) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([owner]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the owner name
    const config = await this.ConfigModel.findOneAndRemove({ owner: owner });

    if (!config) {
      return {
        status: 404,
        message: `No config with owner name ${owner} exists.`,
      };
    }

    return {
      status: 201,
      message: `Config with owner name ${owner} has been deleted successfully.`,
    };
  }

  // This service DELETES config by id
  async deleteConfigById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the _id
    const config = await this.ConfigModel.findOneAndRemove({ _id: _id });

    if (!config) {
      return {
        status: 404,
        message: `No config with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Config with _id ${_id} has been deleted successfully.`,
    };
  }

  // This service UPDATES config by id
  async updateConfigById(_id, updatedConfig) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id, updatedConfig]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any config exists with the _id
    const config = await this.ConfigModel.findOneAndUpdate(
      { _id: _id },
      { ...updatedConfig }
    );

    if (!config) {
      return {
        status: 404,
        message: `No config with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Config with _id ${_id} has been updated successfully.`,
      config: config,
    };
  }

  // This service UPDATES config by owner name
  async updateConfigByOwnerName(owner, updatedConfig) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([owner, updatedConfig]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any config exists with the owner
    const config = await this.ConfigModel.findOneAndUpdate(
      { owner: owner },
      { ...updatedConfig }
    );

    if (!config) {
      return {
        status: 404,
        message: `No config with owner ${owner} exists.`,
      };
    }

    return {
      status: 201,
      message: `Config with owner ${owner} has been updated successfully.`,
      config: config,
    };
  }
}
