const Transactions = require("./../Models/transactionModel");

const addTransaction = async (req, res) => {
  try {
    let newTransaction = await Transactions.create({
      userId: req.user.id,
      ...req.body,
      date: new Date().toISOString(),
    });
    res.status(200).send(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
const getAllTransactions = async (req, res) => {
  try {
    const data = await Transactions.find({ userId: req.user.id });
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await Transactions.findById(id);
    if (transaction.userId == req.user.id) {
      await Transactions.deleteOne({ _id: transaction._id });
    } else {
      return res.status(400).send({
        status: "Bad Request",
        message: "This transaction doesn't belong to you",
      });
    }
    res.send(`Document with ${transaction.name} has bee2n deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const transaction = await Transactions.findById(id);
    if (transaction && transaction.userId == req.user.id) {
      const result = await Transactions.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return res.send(result);
    } else {
      return res.status(400).send({
        status: "Bad Request",
        message: "This transaction doesn't belong to you",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
};
