const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { User, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt"); // For password hashing
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Zod schemas
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

// User signup route
router.post("/signup", async (req, res) => {
  // Zod validation
  const { success, error } = signupBody.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "Invalid input", error });

  const { username, firstName, lastName, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      firstName,
      lastName,
      password: hashedPassword, // Save the hashed password
    });

    // Create account with random balance
    const account = new Accounts({
      balance: 1 + Math.floor(Math.random() * 10000),
      userId: user._id,
    });

    // Save user and account
    await user.save();
    await account.save();

    // Return successful response
    return res.json({
      msg: "User created successfully",
      token: jwt.sign(
        { id: user._id, username: user.username, firstName: user.firstName },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      ),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error creating user", error: err.message });
  }
});

// User signin route
router.post("/signin", async (req, res) => {
  // Zod validation
  const { success, error } = signinBody.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "Invalid input", error });

  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(411).json({ msg: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username, firstName: user.firstName },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ token });
  } catch (err) {
    return res.json({ msg: "Error signing in", error: err.message });
  }
});

// User update route
router.put("/update", authMiddleware, async (req, res) => {
  // Zod validation
  const { success, error } = updateBody.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "Invalid input", error });

  const { firstName, lastName, password } = req.body;
  const userId = req.user.id; // Assuming authMiddleware attaches user object

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(411).json({ msg: "User not found" });

    // Update user details
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = await bcrypt.hash(password, 10); // Hash new password

    await user.save();
    return res.json({ msg: "User updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error updating user", error: err.message });
  }
});

// Bulk user search route
router.get("/bulk", async (req, res) => {
  const { filter } = req.query;

  if (!filter)
    return res.status(400).json({ msg: "Filter query parameter is required" });

  try {
    // Perform case-insensitive search
    const users = await User.find(
      {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
        ],
      },
      "firstName lastName _id" // Only select specific fields
    );

    if (users.length === 0) {
      return res
        .status(404)
        .json({ msg: "No users found matching the filter" });
    }

    // Return users
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
