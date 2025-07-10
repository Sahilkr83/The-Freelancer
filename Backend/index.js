require('dotenv').config(); // Make sure env variables are loaded

const express = require('express');
const cors = require('cors');
const app = express();
// Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({
  origin: ["https://the-freelancers.vercel.app",process.env.FRONTEND_URL, "http://192.168.31.159:3000"],
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