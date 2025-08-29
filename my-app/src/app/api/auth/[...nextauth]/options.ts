import { NextAuthOptions } from "next-auth";
import type { User as NextAuthUser } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import GoogleProvider from "next-auth/providers/google";
import { randomBytes } from "crypto";

interface AuthUser extends NextAuthUser {
  id:string;
  email: string;
  username?: string;
  isVerified: boolean;
  name?: string;
  image?: string;
  userProject:[];

}
export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                identifier:{label:"Email or Username", type:'text',},
                password:{label:"Password", type:'password'}
            },
             async authorize(credentials): Promise<AuthUser | null> {
                await dbConnect() 
                // Check if credentials are provided
                if (!credentials?.identifier || !credentials.password) {
                    throw new Error("No credentials provided");
                }
                // Attempt to find the user by email or username
                try{
                    const user = await UserModel.findOne({$or:[{email:credentials.identifier},{username:credentials.identifier}]}).lean();

                    if(!user){
                        throw new Error('no user found with this email or username')
                    }
                    if(!user.isVerified){
                        throw new Error('please verify your account before login ')
                    }
                    const isPasswordCorredct = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorredct){
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            username: user.username,
                            isVerified: user.isVerified,
                            name:user.name,
                            image:user.image || `https://api.dicebear.com/5.x/initials/png?seed=${user.name}`,
                            userProject:[],
                        } as AuthUser;
                    }else{
                        throw new Error('Incorrect Password')
                    }
                } catch (error) {
                    throw new Error((error as Error)?.message || "Authorization failed");
                }
            }
            
        }),  
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

    ],
    
    callbacks: {
        async signIn({  account, profile }) {
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
                        verifyCodeExpiry:new Date(),
                        userProject:[] // empty or random password
                    });
                }
            }

            return true;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user._id = token._id as string;
                session.user.username = token.username as string;
                session.user.isVerified = true;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.image as string || `https://api.dicebear.com/5.x/initials/png?seed=${token.name}`;
            }
            return session
        },
        async jwt({ token, user }) {
            if(user){
                token._id = user.id;  // NextAuth always sets `user.id`
                token.username = user.username || (user).email?.split('@')[0]
                token.isVerified = true;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image || `https://api.dicebear.com/5.x/initials/png?seed=${(user).name}`;
            }
            return token
        }
    },
    session:{
        strategy:"jwt"
    },secret: process.env.NEXTAUTH_SECRET
}