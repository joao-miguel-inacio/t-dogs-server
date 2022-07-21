const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Buyer = require("..//models/Buyer.model");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    // find buyer
    const Buyer = await Buyer.find();
    return res.status(201).json({ Buyer });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

router.put("/edit", isAuthenticated, async (req, res, next) => {
  try {
    const editBuyer = await Buyer.findByIdAndUpdate(req.body, { new: true });
    return res.status(201).json({ editBuyer });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

/* router.get("/edit", isAuthenticated, async (req, res, next) => {
  try {
    const editBuyer = req.payload._id;
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit", isAuthenticated, async (req, res, next) => {
  // get id from user
  const userId = req.payload._id;
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // set req.payload to updatedBuyer
  } catch (error) {
    res.status(500).json(error);
  }
}); */

module.exports = router;
