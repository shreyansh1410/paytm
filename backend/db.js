const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: { type: String, required: true, trim: true, maxLength: 50 },
  password: { type: String, required: true, minLength: 8 },

  //   account: { type: mongoose.Schema.Types.ObjectId, ref: "Accounts" },
});

const accountSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", accountSchema);
module.exports = { User, Accounts };
