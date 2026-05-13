const dotenv = require("dotenv");
dotenv.config({ path: "./.env" }); // 👈 FORCE correct loading FIRST

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const authRoutes = require("./routes/authRoutes");
const childRoutes = require("./routes/childRoutes");

// Use Routes
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/children", childRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Orphanage Finance Management System API is running...");
});

// 🔥 DEBUG (VERY IMPORTANT)
console.log("MONGO_URI =", process.env.MONGO_URI);

// MongoDB Connection + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
  });