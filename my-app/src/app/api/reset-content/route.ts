import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import ContentDemoUser from "@/model/DemoContentUser";

export async function POST() {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    const username = session?.user?.username;

    if (!username) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    // Remove old demo content
    await ContentDemoUser.deleteOne({ userId: username });

    // Create fresh default content
    await ContentDemoUser.create({
      userId: username,
      heroTitle: {
        text: "Welcome to Your Demo Site",
        style: { color: "#ffffff", fontSize: "2.5rem", fontWeight: "bold", fontStyle: "normal" },
      },
      heroSubtitle: {
        text: "This is a fully customizable demo page...",
        style: { color: "#ffffff", fontSize: "1.25rem", fontWeight: "normal", fontStyle: "normal" },
      },
      features: [
        {
          title: { text: "Modern Design", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
          description: { text: "Clean, responsive layouts built with React & Next.js.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
        },
        {
          title: { text: "Performance", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
          description: { text: "Optimized for speed, SEO, and smooth user experience.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
        },
        {
          title: { text: "Easy Customization", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
          description: { text: "Edit content, sections, and styles effortlessly.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
        },
      ],
      services: [
        {
          title: { text: "Web Development", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
          description: { text: "Create modern, responsive, and SEO-friendly websites using React and Next.js.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
        },
        {
          title: { text: "Video Editing", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
          description: { text: "Professional video editing, motion graphics, and post-production services.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
        },
        {
          title: { text: "UI/UX Design", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
          description: { text: "Design sleek, intuitive, and user-friendly interfaces for any device.", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
        },
      ],
      about: {
        text: "This demo site is built with React & Next.js...",
        style: { color: "#000", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" },
      },
      contact: {
        text: "Reach out via email.",
        style: { color: "#000", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" },
      },
      status:'Live'
    });

    return NextResponse.json({ success: true, message: "Demo content reset successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error resetting demo content" }, { status: 500 });
  }
}
