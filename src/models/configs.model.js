import mongoose from "mongoose";

const ConfigsSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ConfigsModel = mongoose.model("Configs", ConfigsSchema);

export default ConfigsModel;
