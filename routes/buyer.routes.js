const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Buyer = require("..//models/Buyer.model");
// using descriptors: if uncommenting the next line, please comment the 2 lines above
// const Buyer = require ("../models/MegaUser.model")
const Dog = require("../models/Dog.model");
const isBuyer = require("../middleware/isBuyer");

/*
 * * All the routes are prefixed with `/api/user`
 */

//the following route is tested
router.get("/", isAuthenticated, isBuyer, async (req, res, next) => {
  // show available dogs to buyer
  try {
    const dogs = await Dog.find();    
    const availableDogs = dogs.filter(element => element.alreadyAdopted === false  );
    for (let i=0; i<availableDogs.length; i++ ){
      for (let y=0; y<req.foundBuyer.matches.length; y++){
        if (availableDogs[i]._id.toString() === req.foundBuyer.matches[y]._id.toString()){
          availableDogs.splice(i, 1);
        }
      }
    }
    return res.status(201).json( availableDogs );
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.put("/:id/match", isAuthenticated, isBuyer, async (req, res, next) => {
  //updates the current user matches to include the dog he has just been matched with
  try {
    await Buyer.findByIdAndUpdate(req.payload._id, {
      $addToSet: { matches: req.params.id },
    })
    res.status(201).json({ message: "it is a match!" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

//the following route is tested
router.get("/matchlist", isAuthenticated, isBuyer, (req, res, next) => {
  //shows the list of matches for current user in an array
  try {
    const currentBuyerMatches = req.foundBuyer.matches;
    res.status(201).json( currentBuyerMatches );
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
