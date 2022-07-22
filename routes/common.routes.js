const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Buyer = require("../models/Buyer.model");
const Owner = require("../models/Owner.model");
// using descriptors: if uncommenting the next line, please comment the 2 lines above
// const { Owner, Buyer } = require ("../models/MegaUser.model")
const Dog = require("../models/Dog.model");

/*
 * * All the routes are prefixed with `/api/common`
 */

//the following route is tested
router.get("/:id", isAuthenticated, async (req, res, next) => {
  //shows single dog details
  try {
    const dog = await Dog.findById(req.params.id).populate('owner');
    return res.status(201).json({ dog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.get("/", isAuthenticated, async (req, res, next) => {
  //returns user data
  try {
    const foundUser =
      await Buyer.findById( req.payload._id ) ||
      await Owner.findById( req.payload._id );
    // using descriptors: if uncommenting the next line, please comment the line above
    //const foundUser = await MegaUser.findById({ _id: req.payload._id });
    const user = foundUser.toObject();
    delete user.password;
    return res.status(200).json({ user });
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
      await Buyer.findByIdAndUpdate( req.payload._id, req.body, { new: true }) ||
      await Owner.findByIdAndUpdate( req.payload._id, req.body, { new: true });
    // using descriptors: if uncommenting the next line, please comment the line above
    // const updatedUser = await MegaUser.findByIdAndUpdate({ _id: req.payload._id }, req.body, { new: true });
    const user = updatedUser.toObject();
    delete user.password;
    return res.status(201).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
