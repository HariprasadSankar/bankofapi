// src/api.js
import axios from 'axios';

export const fetchTransactions = (accountId, month) => {
  return axios.get(`/api/transactions?accountId=${accountId}&month=${month}`);
};