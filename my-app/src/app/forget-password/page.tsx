import ForgetPasswordPageClient from './forget-password-client';
        // <Head>
        //   <title></title>
        //   <meta name="robots" content="noindex, nofollow" />
        // </Head>

export const metadata = {
  title: 'Recover Your Freelancer Account Password',
  description:'',
  keywords: [''],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "",
    description: "",
    url: "https://thefreelancer.shop/forget-password",
    siteName: "The Freelancer Shop",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
    images: [],
  },
   robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL("https://thefreelancer.shop/")
};

export default function ForgetPasswordPage() {
  return <ForgetPasswordPageClient />;
}

