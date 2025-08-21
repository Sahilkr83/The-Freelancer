
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { resetPasswordMailSender } from "@/heplers/resetConfirmation";
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request:Request){
    await dbConnect()
    try{
        const session = await getServerSession(authOptions);
        const username = session?.user?.username;

        if (!username) {
        return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const {currentPassword,password} = await request.json();

        const existingUserVerified = await UserModel.findOne({ username:username })
        

        if(!existingUserVerified){
            return Response.json({
                success:false,
                message:"something went worng"
            },{status:400})
        }
        if(!await bcrypt.compare(currentPassword,existingUserVerified.password)){
            return Response.json({
                success:false,
                message:"Current password is worng"
            },{status:400})
        }

        const hashedPassword = await bcrypt.hash(password,10)

       
        const emailResponse = await resetPasswordMailSender(existingUserVerified?.email ,existingUserVerified?.name,);

        if(!emailResponse.success){
            return Response.json(
                {
                    success:false,
                    message: "Failed to send confirmation email. Please try again later."
                },
                {  status:500  }
            )
        }else{
            await UserModel.findByIdAndUpdate(
                existingUserVerified._id,
                {
                    password: hashedPassword,
                },
                { new: true, runValidators: true }
    
            );
        }
        return Response.json(
            {
                success:true,
                message: "Password has been changed successfully!"
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