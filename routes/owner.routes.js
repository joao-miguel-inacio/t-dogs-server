const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Owner = require("../models/Owner.model");
// using descriptors: if uncommenting the next line, please comment the 2 lines above
// const Owner = require ("../models/MegaUser.model")
const Dog = require("../models/Dog.model");
const isOwner = require("../middleware/isOwner");
const fileUploader = require("../config/cloudinary.config");

/*
 * * All the routes are prefixed with `/api/owner`
 */

//the following route is tested
router.put("/:id", isAuthenticated, isOwner, async (req, res, next) => {
  //allows owner to edit OWN dog details
  if (
    !req.foundOwner.dog.some(
      (element) => element._id.toString() === req.params.id
    )
  ) {
    return res.status(500).json({ message: "Unauthorized access" });
  }
  const { image, name, breed, age, gender, size, price } = req.body;
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
  try {
    const editDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).json({ editDog });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.get("/", isAuthenticated, isOwner, async (req, res, next) => {
  //returns user own dogs data
  try {
    return res.status(200).json(req.foundOwner.dog);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.post(
  "/",
  fileUploader.single("image"),
  isAuthenticated,
  isOwner,
  async (req, res, next) => {
    //creates a new dog and associates the created dog to the user that created it
    try {
      console.log("in the server, req.body", req.body);
      console.log("in the server, req.body.image", req.body.image);
      const { name, breed, age, gender, size, price } = req.body;
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
      console.log(req.file.path);
      const newDog = await Dog.create({ ...req.body, image: req.file.path });
      await Dog.findByIdAndUpdate(newDog._id, {
        $addToSet: { owner: req.payload._id },
      });
      await Owner.findByIdAndUpdate(req.payload._id, {
        $addToSet: { dog: newDog._id },
      });
      console.log(newDog);
      return res.status(201).json({ newDog });
    } catch (error) {
      return res.status(500).json({ errorMessage: error.message });
    }
  }
);

module.exports = router;
