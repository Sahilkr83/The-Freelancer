import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/heplers/sendVerification";
import { S3 } from "@aws-sdk/client-s3";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, name, email, password } = await request.json();
    const avatarSeed = name?.trim() || username; // fallback to username
    const avatarUrl = `https://api.dicebear.com/5.x/initials/png?seed=${encodeURIComponent(
      avatarSeed
    )}`;

    // Check if username is already taken by a verified account
    const existingUserVerifiedByUserName = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUserName) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const existingUserByUsername = await UserModel.findOne({ username });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    let finalUsername = username; // keep track of username used for S3 folder

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "An account with this email already exists.",
          },
          { status: 400 }
        );
      } else if (!existingUserByEmail.isVerified) {
        // Update unverified account for the same email
        await UserModel.findOneAndUpdate(
          { email: existingUserByEmail.email, isVerified: false },
          {
            $set: {
              username,
              name,
              email,
              image: avatarUrl,
              password: await bcrypt.hash(password, 10),
              verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          },
          { new: true, runValidators: true }
        );
      }
    } else if (existingUserByUsername) {
      // Update unverified account for the same username
      await UserModel.findOneAndUpdate(
        { username: existingUserByUsername.username, isVerified: false },
        {
          $set: {
            username,
            name,
            email,
            image: avatarUrl,
            password: await bcrypt.hash(password, 10),
            verifyCode,
            verifyCodeExpiry: expiryDate,
          },
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create a new account
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        name,
        email,
        image: avatarUrl,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });
      await newUser.save();
    }

    // ✅ Create S3 folder for user
    const folderKey = `${username}/`;
    const result = await s3.send(
        new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Prefix: folderKey,
            MaxKeys: 1,
        })
        );

    const folderExists = result.Contents && result.Contents.length > 0;

    if (!folderExists) {
        await s3.send(
            new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: folderKey,
            })
        );
        console.log(`✅ Created folder for ${username}`);
        } else {
        console.log(`⚡ Folder for ${username} already exists`);
        }

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, name, verifyCode);
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message:
            "Failed to send verification email. Please try again later.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message:
          "Account created successfully. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message:
          "An unexpected error occurred while registering. Please try again.",
      },
      { status: 500 }
    );
  }
}
