import bcrypt from "bcryptjs";
import { validateFields } from "../util/auth.helper.js";
import { checkInviteValidity } from "../util/db.helper.js";

export default class InviteService {
  constructor(HKInviteModel) {
    this.InviteModel = HKInviteModel;
  }

  // This service creates a new invite
  async createInvite(invite) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([
      invite.invite,
      invite.invited_by,
      invite.type,
    ]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if user is already signed up
    const inviteAlreadyExists = await checkInviteValidity(invite.invite);

    // If invite already exists
    if (inviteAlreadyExists.status === 409) return inviteAlreadyExists;

    // If the invite is available, then proceed to create invite
    const newInvite = await this.InviteModel.create({
      ...invite,
    });

    if (newInvite) {
      return {
        status: 201,
        message: "Invite has been created successfully!",
        invite: newInvite,
      };
    } else {
      return {
        status: 500,
        message: "An error occured. Please try again",
        invite: newInvite,
      };
    }
  }

  // This service GETS a invite by invite id
  async getInviteByInviteId(inviteId) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([inviteId]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any invite exists with the invite id
    const invite = await this.InviteModel.findOne({
      invite: inviteId,
    });

    if (!invite) {
      return {
        status: 404,
        message: "No invite exists with the invite id specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched invite with invite id ${inviteId}.`,
      invite: invite,
    };
  }

  // This service GETS a invite by _id
  async getInviteById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any invite exists with the _id provide
    const invite = await this.InviteModel.findOne({
      _id: _id,
    });

    if (!invite) {
      return {
        status: 404,
        message: "No invite exists with the _id specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched invite with _id ${_id}.`,
      invite: invite,
    };
  }

  // This service GETS all invites
  async getInvites() {
    // Fetch all invites
    const invites = await this.InviteModel.find({});

    return {
      status: 200,
      message: `All invites fetched.`,
      invites: invites,
    };
  }

  // This service DELETES invite by invite id
  async deleteInviteByInviteId(inviteId) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([inviteId]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the invite id
    const invite = await this.InviteModel.findOneAndRemove({
      invite: inviteId,
    });

    if (!invite) {
      return {
        status: 404,
        message: `No invite with invite id ${inviteId} exists.`,
      };
    }

    return {
      status: 201,
      message: `Invite with invite id ${inviteId} has been deleted successfully.`,
    };
  }

  // This service DELETES invite by _id
  async deleteInviteById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any invite exists with the _id provided
    const invite = await this.InviteModel.findOneAndRemove({
      _id: _id,
    });

    if (!invite) {
      return {
        status: 404,
        message: `No invite with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Invite with invite id ${_id} has been deleted successfully.`,
    };
  }

  // This service UPDATES invite by invite id
  async updateInviteByInviteId(inviteId, updatedInvite) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([inviteId, updatedInvite]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any invite exists with the inviteId
    const invite = await this.InviteModel.findOneAndUpdate(
      { invite: inviteId },
      { ...updatedInvite }
    );

    if (!invite) {
      return {
        status: 404,
        message: `No invite with inviteId ${inviteId} exists.`,
      };
    }

    return {
      status: 201,
      message: `invite with inviteId ${inviteId} has been updated successfully.`,
      invite: invite,
    };
  }

  // This service UPDATES invite by invite id
  async updateInviteById(_id, updatedInvite) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id, updatedInvite]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any invite exists with the _id
    const invite = await this.InviteModel.findOneAndUpdate(
      { _id: _id },
      { ...updatedInvite }
    );

    if (!invite) {
      return {
        status: 404,
        message: `No invite with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `invite with _id ${_id} has been updated successfully.`,
      invite: invite,
    };
  }
}
