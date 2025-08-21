import mongoose , {Schema, Document} from "mongoose"

export interface User extends Document{
    username:string,
    name:string,
    email:string,
    image:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified: boolean
    resetToken?: string;
    resetTokenExpiry?: Date;
    resetRequestCount: number;
    resetRequestTimeWindow?: Date;
    demoContentEdited: boolean; 
    userProject:[]
}

const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    image:{
		type: String,
	},
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expire is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetToken: {
        type: String,
        default: null,
    },
    resetTokenExpiry: {
        type: Date,
        default: null,
    },
    resetRequestCount: {
        type: Number, 
        default: 0,
        required:true
    },
    resetRequestTimeWindow: {
        type: Date, 
        default: Date.now,
        required:true
    },
    demoContentEdited: {
      type: Boolean,
      required:true,
      default:false// Link to the DemoContent model
    },
    userProject: [],
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);
export default UserModel;
