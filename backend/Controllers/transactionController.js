const Transactions = require("./../Models/transactionModel");

const addTransaction = async (req, res, next) => {
  try {
    let newTransaction = await Transactions.create({
      ...req.body,
      date: new Date(),
    });
    res.status(200).send(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
const getAllTransactions = async (req, res, next) => {
  try {
    const data = await Transactions.find();
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Transactions.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const updateTransaction = async (req, res, nexxt) => {};

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
};
