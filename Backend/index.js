const express = require("express")
require("dotenv")
const app = express()
const dbConnect = require("./config/database")
app.use(express.json());
const PORT = process.env.PORT || 4000;


app.listen(PORT,() => {
    console.log(`THE SERVER IS RUNNING AT ${PORT}`)
})

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});



dbConnect();