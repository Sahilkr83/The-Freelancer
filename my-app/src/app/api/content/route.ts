// app/api/demo-content/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import DemoContent from "@/model/DemoContent";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import ContentDemoUser from "@/model/DemoContentUser";


export async function GET(request:Request) {
  await dbConnect();

  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    if (!user.demoContentEdited) {
      // Serve shared default demo content
      let content = await DemoContent.findOne({});
      if (!content) {
        // Create default only once globally
        content = await DemoContent.create({
          heroTitle: {
            text: "Welcome to Your Demo Site",
            style: { color: "#ffffff", fontSize: "2.5rem", fontWeight: "bold", fontStyle: "normal" }
          },
          heroSubtitle: {
            text: "This is a fully customizable demo page...",
            style: { color: "#ffffff", fontSize: "1.25rem", fontWeight: "normal", fontStyle: "normal" }
          },
          features: [
            {
              title: { text: "Modern Design", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
              description: { text: "Clean, responsive layouts built with React & Next.js.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } }
            },
            {
              title: { text: "Performance", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
              description: { text: "Optimized for speed, SEO, and smooth user experience.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } }
            },
            {
              title: { text: "Easy Customization", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
              description: { text: "Edit content, sections, and styles effortlessly.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } }
            },
          ],
          services: [
            {
              title: { text: "Web Development", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
              description: { text: "CCreate modern, responsive, and SEO-friendly websites using React and Next.js.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } }
            },
            {
              title: { text: "Video Editing", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
              description: { text: "Professional video editing, motion graphics, and post-production services.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } }
            },
            {
              title: { text: "UI/UX Design", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
              description: { text: "Design sleek, intuitive, and user-friendly interfaces for any device.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } }
            },
          ],
          about: { text: "This demo site is built with React & Next.js...", style: { color: "#000", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
          contact: { text: "Reach out via email.", style: { color: "#000", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
        });
      }
      return NextResponse.json(content);
    } else {
      // Serve personalized content
      const userContent = await ContentDemoUser.findOne({ userId: user.username });

      return NextResponse.json(userContent);
    }

  } catch (error) {
    console.error("Error in GET /api/content:", error);
    return NextResponse.json({ success: false, message: "error" });
  }
}


export async function POST(request:Request) {
  await dbConnect();

  try{
    const session = await getServerSession(authOptions);
    const username = session?.user?.username;
    const { status, ...content } = await request.json();

    console.log(status)
    const user = await UserModel.findOne({username})
    if(!user){
      return NextResponse.json({
        success:false,
        message:'Somthing went worng'
      })
    }
    const safeContent = {
      heroTitle: content.heroTitle,
      heroSubtitle: content.heroSubtitle,
      features: content.features,
      services: content.services,
      about: content.about,
      contact: content.contact
    };
    let message = ''
    if(status === "Draft"){
      await ContentDemoUser.findOneAndUpdate({userId:user.username},{ $set: { publishedVersion:{...safeContent}, status } },{new:true,upsert:true})
      message = "Saved as Draft! Successfully";
    }else if(status === "Live"){
      await ContentDemoUser.findOneAndUpdate({userId:user.username},{ $set: { ...safeContent, publishedVersion:[], status } },{new:true,upsert:true})
      message = "Demo site is now Live! with the changes";
    }

    
    
    
    return NextResponse.json({ success: true, message });

  }catch(error){
    console.log(error)
    return NextResponse.json({ success: false, message: "Failed to save content!" });
  }

}
