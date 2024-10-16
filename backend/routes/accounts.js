const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "hello world" });
});

// Get balance of user
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Accounts.findOne({
      userId: new mongoose.Types.ObjectId(req.user.id),
    });
    if (!account) {
      return res.status(404).json({ msg: "Account not found" });
    }
    return res.status(200).json({ balance: account.balance });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Transfer money from one account to another
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = req.body;
    const userid = req.user.id;

    const toAccount = await Accounts.findOne({
      userId: new mongoose.Types.ObjectId(to),
    }).session(session);

    const fromAccount = await Accounts.findOne({
      userId: new mongoose.Types.ObjectId(userid),
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
    const updateFromAccount = await Accounts.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userid) },
      { $inc: { balance: -amount } },
      { new: true, session } // Ensure session is used and return updated document
    );

    const updateToAccount = await Accounts.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(to) },
      { $inc: { balance: amount } },
      { new: true, session }
    );

    if (!updateFromAccount || !updateToAccount) {
      await session.abortTransaction();
      return res.status(500).json({ msg: "Transaction failed" });
    }

    // Commit the transaction
    await session.commitTransaction();

    return res.status(200).json({
      msg: "Transfer successful",
      fromAccountBalance: updateFromAccount.balance,
      toAccountBalance: updateToAccount.balance,
    });
  } catch (err) {
    // Abort transaction in case of error
    await session.abortTransaction();
    return res.status(500).json({ msg: err.message });
  } finally {
    // End session
    session.endSession();
  }
});

module.exports = router;
