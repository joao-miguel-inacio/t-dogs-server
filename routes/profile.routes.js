const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Buyer = require("..//models/Buyer.model");
const Owner = require("../models/Owner.model");
// using descriptors: if uncommenting the next line, please comment the 2 lines above
// const {MegaUser, Owner, Buyer} = require ("../models/MegaUser.model")

/*
 * * All the routes are prefixed with `/api/profile`
 */

//the following route is tested
router.get("/", isAuthenticated, async (req, res, next) => {
  //returns user data
  try {
    const foundUser =
      await Buyer.findById({ _id: req.payload._id }) ||
      await Owner.findById({ _id: req.payload._id });
    // using descriptors: if uncommenting the next line, please comment the line above
    //const foundUser = await MegaUser.findById(userId);
    return res.status(201).json({ foundUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.put("/", isAuthenticated, async (req, res, next) => {
  //allows user to edit own profile
  try {
    const { name, email, address } = req.body;
    if (name === "" || email === "" || address === "") {
      res.status(400).json({
        message: "Please make sure you fill all mandatory fields",
      });
    }
    const updatedUser =
      await Buyer.findByIdAndUpdate({ _id: req.payload._id }, req.body, { new: true }) ||
      await Owner.findByIdAndUpdate({ _id: req.payload._id }, req.body, { new: true });
    // using descriptors: if uncommenting the next line, please comment the line above
    // const updatedUser = await MegaUser.findByIdAndUpdate({ _id: req.payload._id }, req.body, { new: true });
    return res.status(201).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
