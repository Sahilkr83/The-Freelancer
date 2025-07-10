const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    
    mongoose.connect(process.env.DATABASE_URL, {})
    .then(() => console.log("Db connection successfully"))
    .catch((err) =>{
        console.log("Db connection faild")
        console.error(err.message);
		process.exit(1);
    })
}

module.exports = dbConnect