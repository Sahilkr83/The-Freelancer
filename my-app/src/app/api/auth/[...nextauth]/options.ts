import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { email } from "zod";
import GoogleProvider from "next-auth/providers/google";
import { randomBytes } from "crypto";

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:'text',},
                password:{label:"Password", type:'password'}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect() 
                try{
                    const user = await UserModel.findOne({$or:[{email:credentials.identifier},{username:credentials.identifier}]})
                    if(!user){
                        throw new Error('no user found with this email')
                    }
                    if(!user.isVerified){
                        throw new Error('please verify your account before login')
                    }
                    const isPasswordCorredct = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorredct){
                        return user;
                    }else{
                        throw new Error('Incorrect Password')
                    }
                } catch(err:any){
                    throw new Error(err)
                }
            }
        }),  
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

    ],
    
    callbacks: {
        async signIn({ user, account, profile }) {
            await dbConnect();
            if (account?.provider === "google" && profile) {
                const googleProfile = profile as { email: string; name: string; picture: string };
                const randomPassword = randomBytes(8).toString('hex');
                const email = profile.email;
                const name = profile.name;
                const image = googleProfile.picture || `https://api.dicebear.com/5.x/initials/png?seed=${name}`;   
                // check if user exists
                const existingUser = await UserModel.findOne({ email });
                if (!existingUser) {
                    // create new user
                    await UserModel.create({
                        name,
                        email,
                        username: email?.split('@')[0],
                        image,
                        isVerified: true,
                        password: await bcrypt.hash(randomPassword, 10),
                        verifyCode:"VERIFIED",
                        verifyCodeExpiry:new Date() // empty or random password
                    });
                }
            }

            return true;
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
            }
            return session
        },
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString()
                token.username = user.username;
                token.isVerified = user.isVerified;
            }
            return token
        }
    },
    pages:{
        signIn:'/auth/sign-in',
    },
    session:{
        strategy:"jwt"
    },secret: process.env.NEXTAUTH_SECRET
}