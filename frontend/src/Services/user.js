import axios from 'axios';

const baseURL = 'http://localhost:3000';
const api = axios.create({ baseURL });

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`
  }
});

export function getTransactions() {
  return api.get('/transaction', getAuthHeaders());
}

export function createTransaction(transaction) {
  return api.post('/transaction', transaction, getAuthHeaders());
}

export function updateTransaction(id, transaction) {
  return api.put(`/transaction/${id}`, transaction, getAuthHeaders());
}

export function deleteTransaction(id) {
  return api.delete(`/transaction/${id}`, getAuthHeaders());
}
