import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    hwid: {
      type: String,
      required: true,
    },
    expiration_date: {
      type: Number,
      required: true,
      default: 9999999999999,
    },
    banned: {
      type: Boolean,
      required: true,
      default: false,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    invite: {
      type: mongoose.Types.ObjectId,
      ref: "Invite",
      required: false,
    },
    configs: {
      type: mongoose.Types.ObjectId,
      ref: "Config",
      required: false,
    },
    discord: {
      type: String,
      required: false,
    },
    last_request_time: {
      type: String,
      required: false,
    },
    pc_info: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
