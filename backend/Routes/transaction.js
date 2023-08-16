const transactionRouter = require("express").Router();
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
} = require("./../Controllers/transactionController");

transactionRouter.get("/", getAllTransactions);
transactionRouter.post("/", addTransaction);
transactionRouter.delete("/:id", deleteTransaction);
transactionRouter.put("/");

module.exports = { transactionRouter };
