import { Metadata } from 'next';
import DemoClient from './Demo-client';

interface PageProps {
  params: Promise<{ username: string }>;
}

const DemoPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  return <DemoClient username={username} />;
};



// Dynamic metadata for each demo site

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  const title = `${username}'s Demo Site | The Freelancer Shop`;
  const description = `Check out ${username}'s demo website built with The Freelancer Shop platform. Customize and explore projects easily.`;

  return {
    title,
    description,
    keywords: ["demo site", "portfolio", username, "The Freelancer Shop"],
    authors: [{ name: "The Freelancer Shop" }],
    openGraph: {
      title,
      description,
      url: `https://thefreelancer.shop/demo-site/${username}`,
      siteName: "The Freelancer Shop",
      type: "website",
      images: [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://thefreelancer.shop/")
  };
};

export default DemoPage;