const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middleware/isAuthenticated");
const Buyer = require("..//models/Buyer.model");
const Owner = require("../models/Owner.model");
const Dog = require("../models/Dog.model");
const isBuyer = require("../middleware/isBuyer");
const isOwner = require("../middleware/isOwner");

/**
 *
 * * All the routes are prefixed with `/api/dogs`
 *
 */

/**
 *
 * * OWNER
 *
 */

//the following route is tested
router.post("/ownList", isAuthenticated, isOwner, async (req, res, next) => {
  //shows a list of dogs created by current user
  try {
    const dogData = req.foundOwner.dog;
    return res.status(200).json({ dogData });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.post("/create", isAuthenticated, isOwner, async (req, res, next) => {
  //creates a new dog and associates the created dog to the user that created it
  try {
    const {
      image,
      name,
      breed,
      age,
      gender,
      size,
      shortDescription,
      description,
      openToStrangers,
      playful,
      alreadyAdopted,
      chippedAndVaccinated,
      childFriendly,
      requiresExperience,
      goodWithOtherDogs,
      price,
    } = req.body;
    if (
      image === "" ||
      name === "" ||
      breed === "" ||
      age === "" ||
      gender === "" ||
      size === "" ||
      price === ""
    ) {
      res.status(400).json({
        message: "Please make sure you fill all mandatory fields",
      });
    }
    const newDog = await Dog.create(req.body);
    const updatedUser = await Owner.findOneAndUpdate(
      { _id: req.payload._id },
      { $addToSet: { dogs: newDog._id } }
    );
    console.log(updatedUser);
    return res.status(201).json({ newDog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.get("/:id", isAuthenticated, isOwner, async (req, res, next) => {
  //shows single dog details
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);
    return res.status(201).json({ dog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is NOT WORKING. req.body is returning {}
router.put("/:id", isAuthenticated, isOwner, async (req, res, next) => {
  //allows owner to edit own dog
  //check that the dog belongs to the owner
  //check that id is in foundOwner.dog - this will prove that foundOwner is dog's owner
  try {
    const { id } = req.params;
    console.log(id)
    console.log(req.body)
    const editDog = await Dog.findByIdAndUpdate(id, req.body, { new: true });
    console.log(editDog)
    return res.status(200).json({ editDog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

// BUYER
// show available dogs
router.get("/browse", isAuthenticated, isBuyer, async (req, res, next) => {
  const foundBuyer = await Buyer.findById(req.payload._id);
  if (!foundBuyer) {
    res.status(500).json({ message: "Unauthorized access." });
    return;
  }
  try {
    const dogs = await Dog.find();
    //console.log(dogs)
    //filter array and remove dogs in currentBuyer's matches list
    //filter array and remove dogs marked as adopted
    //pass dog's names, prices, images, ids, criteria to match to client side
    //pass buyer's matching criteria to client side
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

// adds dog(s) to buyers matches list
router.put("/:id/match", isAuthenticated, isBuyer, async (req, res, next) => {
  const foundBuyer = await Buyer.findById(req.payload._id);
  if (!foundBuyer) {
    res.status(500).json({ message: "Unauthorized access." });
    return;
  }
  try {
    const { id } = req.params;
    const currentDog = await Dog.findById(id);
    //console.log(currentDog)
    const currentBuyer = await Buyer.findOneAndUpdate(
      { _id: req.payload._id },
      { $addToSet: { matches: dog._id } }
    ).populate(matches);
    //console.log(currentBuyer)
    res.status(201).json({ currentBuyer });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.get("/matchlist", isAuthenticated, isBuyer, (req, res, next) => {
  //shows the list of matches for current user in an array
  try {
    const currentBuyerMatches = req.foundBuyer.matches;
    console.log(currentBuyer);
    res.status(201).json({ currentBuyerMatches });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
