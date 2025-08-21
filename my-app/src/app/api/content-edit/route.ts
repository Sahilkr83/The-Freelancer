// app/api/demo-content/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import ContentDemoUser from "@/model/DemoContentUser";


export async function GET() {
  await dbConnect();
  
    const session = await getServerSession(authOptions);
    const username = session?.user?.username;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    // Serve personalized content
    const userContent = await ContentDemoUser.findOne({ userId: user.username });

    if (userContent.status === 'Draft') {
      return NextResponse.json({
        content: userContent.publishedVersion,
        status: 'Draft',
        message: 'This is a draft version'
      });
    } else if(!userContent.status || userContent.status === "Live"){
      return NextResponse.json({
        content: userContent,
        status: 'Live',
        message: 'This is the live version'
      });
    }

    

  } catch (error) {
    console.error("Error in GET /api/content:", error);
    return NextResponse.json({ success: false, message: "error" });
  }
}
