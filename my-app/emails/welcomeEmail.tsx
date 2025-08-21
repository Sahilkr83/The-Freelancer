// emailTemplates/WelcomeEmail.tsx
import React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome to The Freelancer</title>
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

      <Preview>Welcome to The Freelancer!</Preview>

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
        <Text style={{ textAlign: 'center', color: '#1d4ed8', fontSize: '24px', fontWeight: 'bold' }}>
          Welcome, {name}!
        </Text>

        <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
          Thank you for signing up with <strong>The Freelancer</strong>. We’re excited to have you on board!
        </Text>
        
        <Text style={{ fontSize: '16px', color: '#555', marginTop: '10px' }}>
        Explore our platform and connect with us for your video editing or web development needs.
        </Text>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '20px' }}>
          If you have any questions, feel free to reach out to our support team. We’re here to help!
        </Text>

        <Text style={{ fontSize: '14px', color: '#888', marginTop: '20px' }}>
          — The Freelancer Team
        </Text>
      </Section>
    </Html>
  );
}
