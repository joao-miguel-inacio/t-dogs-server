import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ownerSchema = new Schema(
  {
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
    // check regex phone number is valid
    phoneNumber: {
      type: Number,
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
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dog: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dog",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Owner = model("Owner", ownerSchema);

module.exports = Owner;
