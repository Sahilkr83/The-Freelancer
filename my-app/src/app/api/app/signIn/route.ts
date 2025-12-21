import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { identifier, password } = await request.json();

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "No user found with this email or username" },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, error: "Please verify your account before login" },
        { status: 403 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      message: "SignIn successful",
      user: {
        email: user.email,
        username: user.username,
        name: user.name,
        image: user.image || `https://api.dicebear.com/5.x/initials/png?seed=${user.name}`,
        isVerified: user.isVerified,
        userProject: [],
      },
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Authorization failed" }, { status: 500 });
  }
}
