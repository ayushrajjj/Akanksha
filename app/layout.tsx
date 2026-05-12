import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://akanksha-chi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akanksha Nutrition | Dietician in Vapi",
    template: "%s | Akanksha Nutrition",
  },
  description:
    "Akanksha Nutrition offers personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon. Ideal for people searching for a dietician in Vapi, weight loss in Vapi, or weight gain in Vapi. Online consultations are available.",
  keywords: [
    "dietician in Vapi",
    "best dietician in Vapi",
    "weight loss in Vapi",
    "weight gain in Vapi",
    "online diet consultation",
    "personalized diet plan",
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
    title: "Akanksha Nutrition | Dietician in Vapi",
    description:
      "Akanksha Nutrition offers personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon. Ideal for people searching for a dietician in Vapi, weight loss in Vapi, or weight gain in Vapi.",
    type: "website",
    url: siteUrl,
    siteName: "Akanksha Nutrition",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akanksha Nutrition | Dietician in Vapi",
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
    areaServed: [
      {
        "@type": "City",
        name: "Vapi",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
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
