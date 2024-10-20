const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { User, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const express = require("express");
const zod = require("zod");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, firstName, lastName, password } = req.body;

  //zod validation
  const { success } = signupBody.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "Invalid input" });
  try {
    //check existing user
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //create new user
    const user = new User({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });

    //give the user a random balance between 1 and 10000.
    const account = new Accounts({
      balance: 1 + Math.floor(Math.random() * 10000),
      userId: user._id,
    });

    //save user details
    await user.save();

    //save account details
    await account.save();

    //return if successful
    return res.json({
      msg: "User created successfully",
      token: jwt.sign({ id: user._id, name: user.username }, JWT_SECRET, {
        expiresIn: "1h",
      }),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error creating user", error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signin logic
  const { username, password } = req.body;

  //zod validation
  const { success } = signinBody.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "Invalid input" });

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(411).json({ msg: "user not found" });
    }

    var token = jwt.sign({ id: user._id, name: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      token,
    });
  } catch (err) {
    return res.json({ msg: "error signing in", error: err.message });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  // Implement user update logic
  const { firstName, lastName, password } = req.body;
  const { success } = updateBody.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "Invalid input" });
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(411).json({ msg: "user not found" });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    await user.save();
    return res.json({ msg: "User updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error updating user", error: err.message });
  }
});

router.get("/bulk", async (req, res) => {
  const { filter } = req.query;

  // Ensure filter query is provided
  if (!filter) {
    return res.status(400).json({ msg: "Filter query parameter is required" });
  }

  try {
    // Perform case-insensitive search on both 'firstName' and 'lastName'
    const users = await User.find(
      {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
        ],
      },
      "firstName lastName _id" // Only select 'firstName', 'lastName', and '_id'
    );

    // Check if no users were found
    if (users.length === 0) {
      return res
        .status(404)
        .json({ msg: "No users found matching the filter" });
    }

    // Format response as required
    return res.status(200).json({
      users: users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error fetching users", error: err.message });
  }
});

module.exports = router;
