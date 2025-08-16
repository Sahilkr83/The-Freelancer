import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server"; // ✅ use NextResponse

const UsernameQuerySchema = z.object({
  username: usernameValidation
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const usernameParam = searchParams.get("username") || "";

    const results = UsernameQuerySchema.safeParse({ username: usernameParam });
    // console.log(results, "result");

    if (!results.success) {
      const usernameErrors = results.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message: usernameErrors.length > 0 ? usernameErrors.join(", ") : "Invalid query parameters"
        },
        { status: 400 }
      );
    }

    const { username } = results.data;

    const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });

    if (existingVerifiedUser) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Username is unique" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error checking username", error);
    return NextResponse.json(
      { success: false, message: "Error checking username" },
      { status: 500 }
    );
  }
}
