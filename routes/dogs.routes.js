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

router.put("/match", isAuthenticated, async (req, res, next) => {
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

module.exports = router;
