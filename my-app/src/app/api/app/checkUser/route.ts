
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/heplers/sendVerification";

export async function POST(request: Request) {
  await dbConnect()
  try {
    const { identifier} = await request.json();
    // console.log("API received:", identifier);

    const user = await UserModel.findOne({$or:[{email:identifier},{username:identifier}]})

    if(user){

      if (user.isVerified) {
        return Response.json({
          success: true,
          message: "User Exist",
          email: user.email
        }, { status: 200 });''

      }else{
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        const expiryDate = new Date(); 
        expiryDate.setHours(expiryDate.getHours() + 1);
        await UserModel.findOneAndUpdate( { email:user.email, isVerified: false },
          {
            $set: {
              verifyCode,
              verifyCodeExpiry: expiryDate
            }
          },
          { new: true, runValidators: true } // Ensure the update is validated
        )

        const emailResponse = await sendVerificationEmail(user?.email,user?.name,verifyCode);
        if(!emailResponse.success){
            return Response.json(
              {
                success:false,
                error: "Failed to send verification email. Please try again later."
              },
              {  status:500  }
            )
        }

        return Response.json({
          success: true,
          message: "User Exist but not verifed",
          email: user?.email
        }, { status: 200 });
    }}

    return Response.json({
      success: false,
      error: "New user detected"
    });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
