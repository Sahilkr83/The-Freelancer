
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect()

        try{
        const {username,code} = await request.json()
        console.log("Verifying user with username:", username, "and code:", code)
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            }, {status: 500})
        }
        if(user.isVerified){
            return Response.json({
                success:false,
                message:"User All ready verified"
            }, {status: 500})
        }
        

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            user.verifyCode = 'VERIFIED';
            await user.save()

            return Response.json({
                success:true,
                message:"Account verified successfully"
            }, {status:200})
        }else if (!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification code has expired please sign up again to get a new code"
            }, {status: 400})
        }else{
            return Response.json({
                success:false,
                message:"Verification code is Incorrect"
            }, {status: 400})
        }

    } catch (error){
        console.error("Error verifing user",error)
        return Response.json({
            success:false,
            message:"Error verifing user"
        }, {status:500})
    }
}
