const dotenv = require("dotenv");
dotenv.config(); // keep simple (no forced path unless needed)

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/summary", require("./routes/summaryRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/children", require("./routes/childRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("Orphanage Finance Management System API is running...");
});

// DEBUG (keep temporarily only if needed)
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

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