import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://akanksha-chi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akanksha Nutrition | Personalized Diet Consultation",
    template: "%s | Akanksha Nutrition",
  },
  description:
    "Akanksha Nutrition offers personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon. The website explains consultation plans, services, and a simple way to get started online.",
  keywords: [
    "online diet consultation",
    "personalized diet plan",
    "diet consultation",
    "nutrition guidance",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Akanksha Nutrition | Personalized Diet Consultation",
    description:
      "Akanksha Nutrition offers personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon.",
    type: "website",
    url: siteUrl,
    siteName: "Akanksha Nutrition",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akanksha Nutrition | Personalized Diet Consultation",
    description:
      "Personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon.",
  },
  applicationName: "Akanksha Nutrition",
  creator: "Akanksha",
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Akanksha Nutrition",
    description:
      "Personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon.",
    url: siteUrl,
    serviceType: "Diet consultation",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Diet consultation plans",
      itemListElement: [
        {
          "@type": "Offer",
          name: "1 Month Plan",
        },
        {
          "@type": "Offer",
          name: "3 Month Plan",
        },
        {
          "@type": "Offer",
          name: "6 Month Plan",
        },
      ],
    },
    provider: {
      "@type": "Person",
      name: "Akanksha",
      alumniOf: "Amity University Gurgaon",
      qualifications: "B.Sc. Dietetics & Nutrition",
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
