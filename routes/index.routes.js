const router = require("express").Router();
const authRoutes = require("./auth.routes");
const commonRoutes = require("./common.routes");
const buyerRoutes = require("./buyer.routes");
const ownerRoutes = require("./owner.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/common", commonRoutes);
router.use("/user", buyerRoutes);
router.use("/owner", ownerRoutes);

module.exports = router;
