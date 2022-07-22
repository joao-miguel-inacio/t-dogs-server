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
    const foundUserId = req.payload._id;
    const foundUser =
      (await Buyer.findById(foundUserId)) ||
      (await Owner.findById(foundUserId));
    // using descriptors: if uncommenting the next line, please comment the line above
    //const foundUser = await MegaUser.findById(foundUserId);
    return res.status(201).json({ foundUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.put("/", isAuthenticated, async (req, res, next) => {
  //allows user to edit own profile
  try {
    const id = req.payload._id;
    const { name, email, address } = req.body;
    if (name === "" || email === "" || address === "") {
      res.status(400).json({
        message: "Please make sure you fill all mandatory fields",
      });
    }
    console.log("req.body editing profile", req.body);
    const updatedUser =
      (await Buyer.findByIdAndUpdate(id, req.body, { new: true })) ||
      (await Owner.findByIdAndUpdate(id, req.body, { new: true }));
    // using descriptors: if uncommenting the next line, please comment the line above
    // const updatedUser = await MegaUser.findByIdAndUpdate(req.body, { new: true });
    console.log(updatedUser);
    return res.status(201).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
