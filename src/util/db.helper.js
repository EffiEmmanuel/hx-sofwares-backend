import ConfigsModel from "../models/Configs.model.js";
import InviteModel from "../models/Invite.model.js";

// This method checks if a user email is valid - if it exists in the DB or not
export async function checkConfigValidity(owner) {
  const configExists = await ConfigsModel.findOne({ owner });
  if (configExists)
    return {
      message: "A config is already associated with the owner provided.",
      status: 409,
      config: configExists,
    };

  return {
    message: "Available",
    status: 200,
  };
}

// This method checks if an invite id is valid - if it exists in the DB or not
export async function checkInviteValidity(invite) {
  const inviteExists = await InviteModel.findOne({ invite });
  if (inviteExists)
    return {
      message: "An invite already exists with this code.",
      status: 409,
      config: inviteExists,
    };

  return {
    message: "Available",
    status: 200,
  };
}
