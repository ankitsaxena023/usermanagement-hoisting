const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const connectDB = require("./db/index");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userRoutes);

// Connect to MongoDB
connectDB();

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
