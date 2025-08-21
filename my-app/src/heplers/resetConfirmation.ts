import { PasswordChangedEmail } from "../../emails/confirmation";
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

export async function resetPasswordMailSender(
  email: string,
  name: string,
): Promise<ApiResponse> {
  try {

    const emailHtml = await render(
      PasswordChangedEmail({ name, email })
    );

    const options = {
      from: '"The Freelancer" <thefreelancers27@gmail.com>',
      to: email,
      subject: 'The Freelancer | Password has been reset successfully',
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
