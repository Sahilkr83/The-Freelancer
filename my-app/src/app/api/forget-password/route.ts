
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { resetPasswordMailSender } from "@/heplers/sendResetpassword";
import crypto from "crypto";

const MAX_RESET_REQUESTS = 3; 
const RESET_TIME_WINDOW = 24 * 60 * 60 * 1000; 

export async function POST(request:Request){
    await dbConnect()

    try{

        const { identifier} = await request.json();

        const existingUser = await UserModel.findOne({$or:[{ username:identifier }, {email:identifier}]})

        if(!existingUser){
            return Response.json({
                success:false,
                message:"Account not found "
            },{status:400})
        }

        const checkLimit = existingUser.resetRequestCount ?? 0;
        const windowStart = existingUser.resetRequestTimeWindow?.getTime() ?? 0;
        const now = Date.now(); 

        if (checkLimit >= MAX_RESET_REQUESTS && now - windowStart < RESET_TIME_WINDOW) {
            return Response.json( {
            success: false, 
            message: "Maximum reset requests reached. Try again after 24 hours." 
            }, { status: 429 } ); 
        } else { 
            await UserModel.findByIdAndUpdate( 
            existingUser._id, 
            { 
                resetRequestCount : 0, 
                resetRequestTimeWindow : new Date() 
            }, 
            { new: true, runValidators: true } 
            ) 
        }

        const resetToken = crypto.randomBytes(20).toString('hex'); // Generate a 20-digit hex code
        const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Hash the token for security
        const passwordResetExpiry = new Date(Date.now() + 3600 * 1000);// 1 hour from now

        const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${resetToken}`;



        // console.log("Reset URL:", resetUrl);
       
        const emailResponse = await resetPasswordMailSender(existingUser.email,existingUser.name,resetUrl);

        if(!emailResponse.success){
            return Response.json(
                {
                    success:false,
                    message: "Failed to send verification email. Please try again later."
                },
                {  status:500  }
            )
        }else{
            await UserModel.findOneAndUpdate(
                { _id: existingUser._id },
                {
                    $set: {
                    resetToken: passwordResetToken,
                    resetRequestCount : (existingUser.resetRequestCount || 0) + 1,
                    resetRequestTimeWindow : new Date(),
                    resetTokenExpiry: passwordResetExpiry,
                    },
                },
                { new: true, runValidators: true }
            );
        }
        return Response.json(
            {
                success:true,
                message: "Reset password email sent successfully. Please check your inbox."
            },
            {  status:201  }
        )
    } catch (error){
        console.error('Error registering user',error)
        return Response.json(
        {
            success:false,
            message: "An unexpected error occurred while registering. Please try again."
        },
        {  status:500  }
        )
    }
}