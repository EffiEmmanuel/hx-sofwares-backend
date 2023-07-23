import bcrypt from "bcryptjs";
import {
  checkUserEmailValidity,
  validateFields,
  checkUsernameValidity,
  checkHwidValidity,
} from "../util/auth.helper.js";
import jsonwebtoken from "jsonwebtoken";
import routes from "../routes.js";

const { sign } = jsonwebtoken;

export default class UserService {
  constructor(HKUserModel) {
    this.UserModel = HKUserModel;
  }

  // This service CREATES a new user - Sign up service
  async signupUser(user) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([
      user.username,
      user.hwid,
      user.invite,
      user.discord,
    ]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if user is already signed up
    // const userAlreadyExistsWithEmail = await checkUserEmailValidity(user.email);
    // Check if user is already signed up
    const userAlreadyExistsWithUsername = await checkUsernameValidity(
      user.username
    );

    // If user email already exists
    // if (userAlreadyExistsWithEmail.status === 409)
    //   return userAlreadyExistsWithEmail;

    // If username already exists
    if (userAlreadyExistsWithUsername.status === 409)
      return userAlreadyExistsWithUsername;

    // Hash password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(user.password, salt);

    // Validate Discord id
    // Define the regular expression pattern for Discord user ID
    const regex = /^[0-9]{17,19}$/;

    // Test the input string against the pattern
    const isDiscordId = regex.test(user.discord);

    if (!isDiscordId) {
      return {
        status: 401,
        message: "Wrong Discord ID (example ID: 1114148473508479046).",
      };
    }

    // If the email is available, then proceed to sign up the user
    const newUser = await this.UserModel.create({
      //   password: hashedPassword,
      ...user,
    });

    return {
      status: 201,
      message: "Your account has been created successfully!",
      user: newUser,
    };
  }

  // This service logs in the user
  async loginUser(hwid) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([hwid]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // If the fields are not empty, check the DB for hwid
    const userExists = await checkHwidValidity(hwid);
    if (userExists.status !== 200) {
      // i.e If a user with the provided hwid DOES NOT exist. Check checkHwidValidity() for more context
      return {
        status: 404,
        message: "The hwid provided is not associated with any accounts.",
      };
    }

    const token = sign(userExists, routes.JWT_SECRET, { expires_in: "6h" });
    console.log(token);

    // TODO: If user has 2FA turned on, Send OTP to user's email
    // return {
    //     status: 200,
    //     message: 'An OTP was sent to your registered email.'
    // }

    return {
      token: token,
      status: 200,
      message: "Log in successful!",
    };
  }

  // This service GETS a user by their username
  async getUserByUsername(username) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([username]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the username
    const user = await this.UserModel.findOne({
      username: username,
    })
      .populate({
        path: "invite",
      })
      .populate({
        path: "configs",
      });

    if (!user) {
      return {
        status: 404,
        message: "No user exists with the username specified.",
        user: user,
      };
    }

    return {
      status: 200,
      message: `Fetched user with username ${username}.`,
      user: user,
    };
  }

  // This service GETS a user by their id
  async getUserById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the username
    const user = await this.UserModel.findOne({
      _id: _id,
    })
      .populate({
        path: "invite",
      })
      .populate({
        path: "configs",
      });

    if (!user) {
      return {
        status: 404,
        message: "No user exists with the id specified.",
        user: user,
      };
    }

    return {
      status: 200,
      message: `Fetched user with id ${_id}.`,
      user: user,
    };
  }

  // This service GETS all users
  async getUsers() {
    // Check if any user exists with the username
    const users = await this.UserModel.find({})
      .populate({
        path: "invite",
      })
      .populate({
        path: "configs",
      });

    return {
      status: 200,
      message: `All users fetched.`,
      users: users,
    };
  }

  // This service DELETES user by username
  async deleteUserByUsername(username) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([username]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the username
    const user = await this.UserModel.findOneAndRemove({ username: username });

    if (!user) {
      return {
        status: 404,
        message: `No user with username ${username} exists.`,
      };
    }

    return {
      status: 201,
      message: `User with username ${username} has been deleted successfully.`,
    };
  }

  // This service DELETES user by id
  async deleteUserById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the _id
    const user = await this.UserModel.findOneAndRemove({ _id: _id });

    if (!user) {
      return {
        status: 404,
        message: `No user with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `User with _id ${_id} has been deleted successfully.`,
    };
  }

  // This service UPDATES a user by id
  async updateUserById(_id, updatedUser) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id, updatedUser]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the _id
    const user = await this.UserModel.findOneAndUpdate(
      { _id: _id },
      { ...updatedUser }
    );

    if (!user) {
      return {
        status: 404,
        message: `No user with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `User with _id ${_id} has been updated successfully.`,
    };
  }

  // This service UPDATES a user by username
  async updateUserByUsername(username, updatedUser) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([username, updatedUser]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any user exists with the username
    const user = await this.UserModel.findOneAndUpdate(
      { username: username },
      { ...updatedUser }
    );

    if (!user) {
      return {
        status: 404,
        message: `No user with username ${username} exists.`,
      };
    }

    return {
      status: 201,
      message: `User with username ${username} has been updated successfully.`,
    };
  }
}
