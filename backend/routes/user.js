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
      balance: 1 + Math.random() * 10000,
      userId: user._id,
    });

    //save user details
    await user.save();

    //save account details
    await account.save();

    //return if successful
    return res.json({
      msg: "User created successfully",
      token: jwt.sign(
        { id: user._id, name: user.username, firstName: user.firstName },
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
    const fname = user.firstName;
    var token = jwt.sign(
      { id: user._id, name: user.username, firstName: fname },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
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
  let { filter } = req.query;

  // If the filter is "all" or not provided, return all users
  if (!filter || filter.trim().toLowerCase() === "all") {
    try {
      const users = await User.find({}, "firstName lastName _id"); // Fetch all users
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
  }

  // Otherwise, filter users by the provided filter value
  filter = filter.trim();

  try {
    const users = await User.find(
      {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
        ],
      },
      "firstName lastName _id"
    );

    if (users.length === 0) {
      return res
        .status(404)
        .json({ msg: "No users found matching the filter" });
    }

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
