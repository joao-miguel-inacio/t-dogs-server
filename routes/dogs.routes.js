const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middleware/isAuthenticated");
const Buyer = require("..//models/Buyer.model");
const Owner = require("../models/Owner.model");
const Dog = require("../models/Dog.model");

/**
 *
 * * All the routes are prefixed with `/api/dogs`
 *
 */

// BUYER
// show available dogs
router.get("/browse", isAuthenticated, async (req, res, next) => {
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
router.put("/:id/match", isAuthenticated, async (req, res, next) => {
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

// show buyers matches list
router.get("/matchlist", isAuthenticated, async (req, res, next) => {
  const foundBuyer = await Buyer.findById(req.payload._id).populate(matches);
  if (!foundBuyer) {
    res.status(500).json({ message: "Unauthorized access." });
    return;
  }
  try {
    //console.log(foundBuyer.matches)
    //pass buyer's matches to client side
    res.status(201).json({ foundBuyer });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

// OWNER

// OwnList
router.post("/:id/ownList", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const saveDog = await Dog.findById(id);
  // get current user and get user id
  const dogId = req.payload._id;
  try {
    await Dog.findByIdAndUpdate(
      dogId,
      { $addToSet: { ownList: saveDog.id } },
      { new: true }
    );
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//CREATE
// create new dog
router.post("/create", isAuthenticated, async (req, res, next) => {
  try {
    const foundOwner = await Owner.findById(req.payload._id);
    if (!foundOwner) {
      res.status(500).json({ message: "Unauthorized access." });
      return;
    }
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
    /* if (!name AND EVERYTHING ELSE THAT IS MANDATORY) {
      return res.status(500).json({ errorMessage: "Name is required" });
    } 
    ALSO NEED TO PASS ALL INFO TO THE CLIENT SIDE TO POPULATE THE FORM WITH CURRENT VALUE*/
    const newDog = await Dog.create(req.body);
    const updatedUser = await Owner.findOneAndUpdate(
      { _id: req.payload._id },
      { $addToSet: { dog: newDog._id } }
    )
    console.log(updatedUser)
    return res.status(201).json({ newDog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

// EDIT
// get single dog
router.get("/:id/edit", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);
    return res.status(201).json({ dog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

// update dog
router.put("/:id/edit", isAuthenticated, async (req, res, next) => {
  
  //check that the dog belongs to the owner
  //check that id is in foundOwner.dog - this will prove that foundOwner is dog's owner
  try {
    const foundOwner = await Owner.findById(req.payload._id);
  if (!foundOwner) {
    res.status(500).json({ message: "Unauthorized access." });
    return;
  }
  console.log(foundOwner.dog)
    const { id } = req.params;
    console.log(id)
    console.log(req.body)
    const editDog = await Dog.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(201).json({ editDog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
