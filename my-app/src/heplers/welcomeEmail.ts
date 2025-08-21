import { WelcomeEmail} from "../../emails/welcomeEmail";
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import { ApiResponse } from "@/types/ApiResponse";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function WelcomeEmailfunction(
  name: string,
  email: string,
): Promise<ApiResponse> {
  try {

    const emailHtml = await render(
      WelcomeEmail({ name })
    );

    const options = {
      from: '"The Freelancer" <thefreelancers27@gmail.com>',
      to: email,
      subject: 'Welcome to The Freelancer!',
      html: emailHtml,
    };

    await transporter.sendMail(options);

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error Sending verification email:", emailError);
    return {
      success: false,
      message: 'Failed to send verification email',
    };
  }
}
