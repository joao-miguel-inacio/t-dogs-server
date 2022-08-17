const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middleware/isAuthenticated");
const Buyer = require("../models/Buyer.model");
const Owner = require("../models/Owner.Model");
// using descriptors: if uncommenting the next line, please comment the 2 lines above
// const {MegaUser, Owner, Buyer} = require ("../models/MegaUser.model")
const saltRounds = 10;

const isBuyer = require("../middleware/isBuyer");
const isOwner = require("../middleware/isOwner");

/*
 * * All the routes are prefixed with `/api/auth`
 */

//the following route is tested
router.post("/signup", async (req, res, next) => {
  //allows user to sign up

  const { userType } = req.body;
  if (userType === "isBuyer") {
    const {
      name,
      email,
      password,
      address,
      hasChildren,
      hasExperience,
      hasPets,
    } = req.body;
    if (email === "" || name === "" || password === "" || address === "") {
      res.status(400).json({
        message: "Please provide your email, name, password and address",
      });
    }

    // ! To use only if you want to enforce strong password (not during dev-time)

    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    // if (!regex.test(password)) {
    // 	return res
    // 		.status(400)
    // 		.json({
    // 			message:
    // 				"Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    // 		});
    // }

    try {
      const foundBuyer = await Buyer.findOne({ email });
      if (foundBuyer) {
        res
          .status(400)
          .json({ message: "Email already registered, please login." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPass = bcrypt.hashSync(password, salt);

      const createdBuyer = await Buyer.create({
        userType,
        name,
        email,
        password: hashedPass,
        address,
        hasChildren,
        hasExperience,
        hasPets,
      });

      const user = createdBuyer.toObject();
      delete user.password;
      // ! Sending the user as json to the client
      res.status(201).json({ user });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage:
            "Only one can be associated to an email. The email you chose is already in use.",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    }
  } else {
    const { name, email, password, address } = req.body;
    if (email === "" || name === "" || password === "" || address === "") {
      res.status(400).json({
        message: "Please provide your email, name, password and address",
      });
    }

    // ! To use only if you want to enforce strong password (not during dev-time)

    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    // if (!regex.test(password)) {
    // 	return res
    // 		.status(400)
    // 		.json({
    // 			message:
    // 				"Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    // 		});
    // }

    try {
      const foundOwner = await Owner.findOne({ email });
      if (foundOwner) {
        res
          .status(400)
          .json({ message: "Email already registered, please login." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPass = bcrypt.hashSync(password, salt);

      const createdOwner = await Owner.create({
        userType,
        name,
        email,
        password: hashedPass,
        address,
      });

      const user = createdOwner.toObject();
      delete user.password;
      // ! Sending the user as json to the client
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage:
            "Only one can be associated to an email. The email you chose is already in use.",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    }
  }
});

const comparePasswordAndCreateToken = (password, foundUser) => {
  const goodPass = bcrypt.compareSync(password, foundUser.password);
  if (goodPass) {
    const user = foundUser.toObject();
    delete user.password;

    /**
     * Sign method allow you to create the token.
     *
     * ---
     *
     * - First argument: user, should be an object. It is our payload !
     * - Second argument: A-really-long-random-string...
     * - Third argument: Options...
     */

    const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "90d",
    });
    return authToken;
  }
  return null;
};

//the following route is tested
router.post("/signin", async (req, res, next) => {
  //allows user to sign in
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Please provide your email and password" });
  }
  try {
    const foundBuyer = await Buyer.findOne({ email });
    if (foundBuyer) {
      const foundUser = foundBuyer;
      const authToken = comparePasswordAndCreateToken(password, foundUser);
      if (authToken) {
        res.status(200).json({ authToken });
      } else {
        res.status(500).json({ message: "Wrong password." });
      }
    } else {
      const foundOwner = await Owner.findOne({ email });
      if (!foundOwner) {
        res.status(500).json({ message: "Wrong credentials." });
        return;
      }
      const foundUser = foundOwner;

      const authToken = comparePasswordAndCreateToken(password, foundUser);

      /*  const authToken = comparePasswordAndCreateToken (password, foundUser); */
      console.log(authToken);

      if (authToken) {
        res.status(200).json({ authToken });
      } else {
        res.status(500).json({ message: "Wrong password." });
      }
    }
  } catch (error) {
    next(error);
  }
});

//the following route is tested
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
