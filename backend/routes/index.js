const router = require("express").Router();
const userRouter = require("./user");
const accountRouter = require("./accounts");

// Define user-related routes

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

router.use("/account", accountRouter);
router.use("/user", userRouter);

module.exports = router;
