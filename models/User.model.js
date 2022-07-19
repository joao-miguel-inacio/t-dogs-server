const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case

const User = model("User", userSchema);

const userSchema = new Schema(
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
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 9,
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
    hasChildren: {
      type: Boolean,
      default: false,
      required: true,
    },
    hasExperience: {
      type: Boolean,
      default: false,
      required: true,
    },
    hasPets: {
      type: Boolean,
      default: false,
      required: true,
    },
    matches: {
      type: ObjectId,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = User;
