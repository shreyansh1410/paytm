const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "hello world" });
});

//get balance of user, authmiddleware has assigned req.user = decoded
router.get("/balance", authMiddleware, async (req, res) => {
  //   console.log(userId);
  //   console.log(req.user.id);
  const account = await Accounts.findOne({
    userId: new mongoose.Types.ObjectId(req.user.id),
  });
  if (!account) {
    return res.status(404).json({ msg: "Account not found" });
  }
  return res.status(200).json({ balance: account.balance });
});

//transfer money from one account to another
router.post("/transfer", authMiddleware, async (req, res) => {
  //implementing transactions in mongodb: (to ensure atomicity, all or none)
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = req.body;
    const userid = req.user.id;
    const toAccount = await Accounts.findOne({ userId: to }).session(session);
    console.log(req.user.id);
    const fromAccount = await Accounts.findOne({
      userId: new mongoose.Types.ObjectId(req.user.id),
    }).session(session);

    // Check if both accounts exist
    if (!fromAccount) {
      await session.abortTransaction();
      return res.status(404).json({ msg: "Your account not found" });
    }

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ msg: "Recipient account not found" });
    }

    // Check for sufficient balance
    if (fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Perform the transfer
    await fromAccount
      .updateOne(
        { userId: new mongoose.Types.ObjectId(req.user.id) },
        { $inc: { balance: -amount } }
      )
      .session(session);
    await toAccount
      .updateOne(
        { userId: new mongoose.Types.ObjectId(to) },
        { $inc: { balance: amount } }
      )
      .session(session);

    //commit the transaction
    await session.commitTransaction();

    
    return res.status(200).json({
      msg: "Transfer successful",
    });
  } catch (err) {
    //abort transaction
    await session.abortTransaction();
    return res.status(500).json({ msg: err.message });
  } finally {
    //end session
    session.endSession();
  }
});

module.exports = router;
