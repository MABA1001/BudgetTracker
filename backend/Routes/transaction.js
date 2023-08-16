const transactionRouter = require("express").Router();
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
} = require("./../Controllers/transactionController");

transactionRouter.get("/", getAllTransactions);
transactionRouter.post("/", addTransaction);
transactionRouter.delete("/:id", deleteTransaction);
transactionRouter.put("/:id", updateTransaction);

module.exports = { transactionRouter };
