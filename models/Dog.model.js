const { Schema, model } = require("mongoose");

const dogSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  size: {
    type: String,
    required: true,
    enum: ["small", "medium", "large"],
  },
  shortDescription: {
    type: String,
    maxLength: 45,
  },
  description: {
    type: String,
    maxLength: 450,
  },
  openToStrangers: {
    type: Boolean,
    default: false,
  },
  playful: {
    type: Boolean,
    default: false,
  },
  alreadyAdopted: {
    type: Boolean,
    default: false,
  },
  chippedAndVaccinated: {
    type: Boolean,
    default: false,
  },
  childFriendly: {
    type: Boolean,
    default: false,
  },
  requiresExperience: {
    type: Boolean,
    default: false,
  },
  goodWithOtherDogs: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner", 
  }
});

const Dog = model("Dog", dogSchema);

module.exports = Dog;
