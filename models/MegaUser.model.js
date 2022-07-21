const { Schema, model } = require("mongoose");

const megaUserSchema = new Schema(
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
    },
    description: {
      type: String,
      maxLength: 450,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MegaUser = model("MegaUser", megaUserSchema);

const buyerSchema = new Schema({
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
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dog",
    },
  ],
});

const Buyer = MegaUser.discriminator("Buyer", buyerSchema);

const ownerSchema = new Schema({
    phoneNumber: {
        type: Number,
      },
      dog: [
        {
          type: Schema.Types.ObjectId,
          ref: "Dog",
        },
      ],
  });
  
  const Owner = MegaUser.discriminator("Owner", ownerSchema);

module.exports = {MegaUser, Buyer, Owner};
