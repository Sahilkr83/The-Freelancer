import dbConnect from "@/lib/dbConnect"; import UserModel from "@/model/User"; 
import { resetPasswordMailSender } from "@/heplers/resetConfirmation"; 
import crypto from "crypto"; 
import bcrypt from "bcryptjs" 

export async function POST(request:Request){
   await dbConnect() 
   try{ 
    const {token, password} = await request.json(); 

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex") 

    const existingUserVerified = await UserModel.findOne({resetToken:hashedToken , resetTokenExpiry:{$gt:Date.now()}}) 

    if(!existingUserVerified){ 
      return Response.json({ 
          success:false,
          message:"Link has expired or is invalid"
        },
        {status:400}
      ) 
    } 
    
    
    const hashedPassword = await bcrypt.hash(password,10) 

    const emailResponse = await resetPasswordMailSender(existingUserVerified?.email ,existingUserVerified?.name,); 
    if(!emailResponse.success){ 
      return Response.json( 
        { 
          success:false, 
          message: "Failed to send confirmation email. Please try again later." 
        }, { status:500 } ) 
      }else{ 
        await UserModel.findOneAndUpdate(
          { _id: existingUserVerified._id },
          { 
            password: hashedPassword, 
            resetToken: null, 
            resetTokenExpiry: null 
          }, 
          { new: true, runValidators: true } ); 
      } 
      
      return Response.json( { 
        success:true, 
        message: "Password has been reset successfully!" 
      }, { status:201 } 
    ) 
  } catch (error){
    console.error('Error registering user',error) 
    return Response.json( { 
      success:false, 
      message: "An unexpected error occurred while registering. Please try again." 
    }, { status:500 } ) } 
  }