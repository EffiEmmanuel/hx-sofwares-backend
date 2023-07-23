import InviteModel from "../models/Invite.model.js";
import InviteService from "../service/InviteService.js";

// Generic messages
const internalServerError =
  "An error occured while we processed your request. Please try again.";

// SERVICE INSTANCES
// Create a new InviteService instance
const inviteService = new InviteService(InviteModel);

// Create invite
export const createInvite = async (req, res) => {
  const { invite, invited_by, type } = req.body;

  try {
    // Create new invite
    const newInvite = await inviteService.createInvite({
      invite,
      invited_by,
      type,
    });

    // Return a response
    return res
      .status(newInvite?.status)
      .json({ invite: newInvite?.invite ?? null, message: newInvite?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get invite by invite id
export const getInviteByInviteId = async (req, res) => {
  const { inviteId } = req.body;

  try {
    // Fetch invite
    const invite = await inviteService.getInviteByInviteId(inviteId);

    // Return a response
    return res
      .status(invite?.status)
      .json({ invite: invite?.invite ?? null, message: invite?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get invite by _id
export const getInviteById = async (req, res) => {
  const { _id } = req.body;

  try {
    // Fetch invite
    const invite = await inviteService.getInviteById(_id);

    // Return a response
    return res
      .status(invite?.status)
      .json({ invite: invite?.invite ?? null, message: invite?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get invites
export const getInvites = async (req, res) => {
  try {
    // Fetch invites
    const invites = await inviteService.getInvites();

    // Return a response
    return res
      .status(invites?.status)
      .json({ invites: invites?.invites ?? null, message: invites?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete invite by invite id
export const deleteInviteByInviteId = async (req, res) => {
  const { inviteId } = req.body;
  try {
    // DELETE invite
    const invite = await inviteService.deleteInviteByInviteId(inviteId);

    // Return a response
    return res
      .status(invite?.status)
      .json({ invite: invite?.invite ?? null, message: invite?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete invite by _id
export const deleteInviteById = async (req, res) => {
  const { _id } = req.body;
  try {
    // DELETE invite
    const invite = await inviteService.deleteInviteById(_id);

    // Return a response
    return res
      .status(invite?.status)
      .json({ invite: invite?.invite ?? null, message: invite?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update invite by _id
export const updateInviteById = async (req, res) => {
  const { _id /* Other config fields go here */ } = req.body;
  const updatedDetails = {}; // An object with other config fields

  try {
    // UPDATE invite
    const invite = await inviteService.updateInviteById(_id, updatedDetails);

    // Return a response
    return res
      .status(invite?.status)
      .json({ invite: invite?.invite ?? null, message: invite?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update invite by invite id
export const updateInviteByInviteId = async (req, res) => {
  const { inviteId /* Other config fields go here */ } = req.body;
  const updatedDetails = {}; // An object with other config fields
  try {
    // UPDATE invite
    const invite = await inviteService.updateInviteByInviteId(
      inviteId,
      updatedDetails
    );

    // Return a response
    return res
      .status(invite?.status)
      .json({ invite: invite?.invite ?? null, message: invite?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};
