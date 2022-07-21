const Buyer = require("../models/Buyer.model");

async function isBuyer(req, res, next) {
  try {
    console.log(req.payload)
    const foundBuyer = await Buyer.findById(req.payload._id).populate('matches');
    if (!foundBuyer) {
      res.status(500).json({ message: "Unauthorized access." });
      return;
    }
    req.foundBuyer = foundBuyer;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = isBuyer;
