const { Schema, model } = require("mongoose");

const ownerSchema = new Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["isOwner"],
    },
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
