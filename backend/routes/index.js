const router = require("express").Router();
const userRouter = require("./user");

// Define user-related routes

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});
router.use("/user", userRouter);

module.exports = router;
