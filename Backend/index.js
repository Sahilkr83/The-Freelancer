const express = require("express")
require("dotenv").config
const app = express()
const cors = require("cors");
// Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.31.159:3000"],
  credentials: true
}));


const dbConnect = require("./config/database")
app.use(express.json());

const PORT = process.env.PORT || 8000;

const userRoutes = require("./routes/user");

app.use("/api/v1", userRoutes);

app.listen(PORT,() => {
    console.log(`THE SERVER IS RUNNING AT ${PORT}`)
})

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});

const cron = require("node-cron");
const deleteUnverifiedUsers = require("./cron/deleteUnverifiedUsers");

cron.schedule("*/5 * * * *", () => {
  deleteUnverifiedUsers();
});


dbConnect();