import axios from "axios";

const baseURL = "http://localhost:3000";
const api = axios.create({ baseURL });

// USERS
export function loginUser(user) {
  return api.post("/user/login", user);
}

export function signupUser(user) {
  return api.post("/user/signup", user);
}

// TRANSACTIONS
export function getTransactions() {
  return api.get("/transaction", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`,
    },
  });
}

export function createTransaction(transaction) {
  return api.post("/transactions", transaction);
}

export function updateTransaction(id, transaction) {
  return api.put(`/transactions/${id}`, transaction);
}

export function deleteTransaction(id) {
  return api.delete(`/transactions/${id}`);
}
