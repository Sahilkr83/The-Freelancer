// emailTemplates/PasswordChangedEmail.tsx
import React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordChangedEmailProps {
  name: string;
  email: string;
}

export function PasswordChangedEmail({ name, email }: PasswordChangedEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Password Successfully Updated</title>
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

      <Preview>Your password has been updated</Preview>

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
          The password for your account <strong>{email}</strong> has been successfully updated. You can now use your new password to sign in.
        </Text>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
          If you did not make this change, please contact our support immediately to secure your account.
        </Text>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '20px' }}>
          Thank you for using our service!
        </Text>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
          — The Freelancer Team
        </Text>
      </Section>
    </Html>
  );
}
