const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Customer","Visitor"]
    },
    image: {
		type: String,
		required: true,
	},
    isVerified: {
        type: Boolean,
        default: false,
    },
    otpRequestTimestamps: {
        type: [Date],
        default: []
    },
    deviceHashes: {
        type: [String],
        default: []
    }



},{
  timestamps: true // This adds createdAt and updatedAt automatically
})

module.exports = mongoose.model("User",userSchema)