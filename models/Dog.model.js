import mongoose from "mongoose";
const { Schema, model } = mongoose;

const dogSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breedGroup: {
    type: String,
    enum: [],
    required: true,
  },
  // check if approximate
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
    enum: ["S", "M", "L"],
  },
  /*  // weight information table
  weight: {
    type: Number,
    enum: ["S", "M", "L"],
    required: true
  },
  expectedWeight: {
    type: Number,
    enum: ["S", "M", "L"],
    required: true
  },
  height: {
    type: String,
  }, */
  shortDescription: {
    type: String,
    maxLength: 25,
  },
  description: {
    type: String,
    required: true,
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
  alreadyAdopted: {
    type: Boolean,
  },
});

const Dog = model("Dog", dogSchema);

module.exports = Dog;
