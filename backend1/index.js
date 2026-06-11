const express = require("express");
const dotenv = require("dotenv");
const dns = require("dns");

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(express.json());

//routes 
const helloRoutes = require("./routes/helloRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const myselfRoutes = require("./routes/myselfRoutes");
app.use("/api", helloRoutes);
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", myselfRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});