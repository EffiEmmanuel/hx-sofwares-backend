import UserModel from "../models/user.model.js";
import UserService from "../service/UserService.js";

// Generic messages
const internalServerError =
  "An error occured while we processed your request. Please try again.";

// SERVICE INSTANCES
// Create a new UserService instance
const userService = new UserService(UserModel);

// Sign up user
export const signupUser = async (req, res) => {
  const { username, hwid, invite, discord } = req.body;

  try {
    // Create new user
    const user = await userService.signupUser({
      username,
      hwid,
      invite,
      discord,
    });

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Log in user
export const loginUser = async (req, res) => {
  const { hwid } = req.body;

  try {
    // Log in user
    const user = await userService.loginUser({
      hwid,
    });

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get user by username
export const getUserByUsername = async (req, res) => {
  const { username } = req.body;

  try {
    // Fetch user
    const user = await userService.getUserByUsername(username);

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get user by _id
export const getUserById = async (req, res) => {
  const { _id } = req.body;

  try {
    // Fetch user
    const user = await userService.getUserById(_id);

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get users
export const getUsers = async (req, res) => {
  try {
    // Fetch users
    const users = await userService.getUsers();

    // Return a response
    return res
      .status(users?.status)
      .json({ users: users?.user ?? null, message: users?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete user by username
export const deleteUserByUsername = async (req, res) => {
  const { username } = req.body;
  try {
    // DELETE user
    const user = await userService.deleteUserByUsername(username);

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete user by id
export const deleteUserById = async (req, res) => {
  const { _id } = req.body;
  try {
    // DELETE user
    const user = await userService.deleteUserById(_id);

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update user by id
export const updateUserById = async (req, res) => {
  const { _id /* Other user fields go here */ } = req.body;
  const updatedDetails = {}; // An object with other user fields
  try {
    // UPDATE user
    const user = await userService.updateUserById(_id, updatedDetails);

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update user by username
export const updateUserByUsername = async (req, res) => {
  const { username /* Other user fields go here */ } = req.body;
  const updatedDetails = {}; // An object with other user fields
  try {
    // UPDATE user
    const user = await userService.updateUserById(username, updatedDetails);

    // Return a response
    return res
      .status(user?.status)
      .json({ user: user?.user ?? null, message: user?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};
