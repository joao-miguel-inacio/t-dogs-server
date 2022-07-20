const { Schema, model, mongoose } = require("mongoose");

const MegaUserSchema = new Schema(
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
    },
    address: {
      type: String,
      required: true,
    },
    slug: { type: String, slug: "userType" },
  },
  {
    timestamps: true,
  }
);

const MegaUser = model("User", userSchema);

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

const sellerSchema = new Schema({
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
  
  const Seller = MegaUser.discriminator("Seller", sellerSchema);

module.exports = {MegaUser, Buyer, Seller};