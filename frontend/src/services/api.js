import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// AUTH
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// EXPENSES (FIXED)
export const addExpense = (data) =>
  API.post("/expenses", data);

export const getExpenses = () =>
  API.get("/expenses");

// DONATIONS (FIXED)
export const addIncome = (data) =>
  API.post("/donations", data);

export const getIncome = () =>
  API.get("/donations");

// SUMMARY
export const getSummary = () =>
  API.get("/summary");

export default API;