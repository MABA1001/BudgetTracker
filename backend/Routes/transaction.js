const transactionRouter = require("express").Router();
const { authUser } = require("../Middleware/authUser");
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
} = require("./../Controllers/transactionController");

transactionRouter.get("/", authUser, getAllTransactions);
transactionRouter.post("/", authUser, addTransaction);
transactionRouter.delete("/:id", authUser, deleteTransaction);
transactionRouter.put("/:id", authUser, updateTransaction);

module.exports = { transactionRouter };
