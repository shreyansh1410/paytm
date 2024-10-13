const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
