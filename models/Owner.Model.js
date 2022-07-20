import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ownerSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 8,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLength: 450,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    dog: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Owner = model("Owner", ownerSchema);

module.exports = Owner;
