const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;
