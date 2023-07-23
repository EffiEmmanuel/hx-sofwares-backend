import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    invite: {
      type: String,
      required: true,
    },
    invited_by: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const InviteModel = mongoose.model("Invite", InviteSchema);

export default InviteModel;
