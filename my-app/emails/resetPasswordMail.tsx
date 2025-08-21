// emailTemplates/ResetPasswordEmail.tsx
import React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  resetLink: string;
}

export function ResetPasswordEmail({ name, resetLink }: ResetPasswordEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Reset Your Password</title>
        <Font
          fontFamily="Arial, sans-serif"
          fallbackFontFamily={["Verdana"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Password Reset Request from The Freelancer</Preview>

      <Section
        style={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '30px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Text style={{ textAlign: 'center', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Hello {name},
        </Text>

        <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
          We received a request to reset your password. Click the button below to set a new password:
        </Text>

        <Section style={{ textAlign: 'center', margin: '25px 0' }}>
          <Button
            href={resetLink}
            style={{
              backgroundColor: "#2563EB",
              color: "#ffffff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: "16px",
            }}
          >
            Reset Password
          </Button>
        </Section>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
          If you did not request a password reset, please ignore this email.
        </Text>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
          This link will expire in 10 minutes.
        </Text>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '20px' }}>
          — The Freelancer Team
        </Text>
      </Section>
    </Html>
  );
}
