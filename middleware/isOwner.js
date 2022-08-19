const Owner = require("../models/Owner.model");

async function isOwner(req, res, next) {
  try {
    const foundOwner = await Owner.findById(req.payload._id).populate("dog");
    if (!foundOwner) {
      res.status(500).json({ message: "Unauthorized access." });
      return;
    }
    req.foundOwner = foundOwner;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = isOwner;
