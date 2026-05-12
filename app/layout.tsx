import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akanksha Nutrition | Personalized Diet Consultation",
  description:
    "Personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon. Akanksha has guided 5+ clients with lifestyle-based diet plans for individual goals, preferences, and health background.",
  openGraph: {
    title: "Akanksha Nutrition | Personalized Diet Consultation",
    description:
      "Personalized diet consultation by Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon. Akanksha has guided 5+ clients with lifestyle-based diet plans for individual goals, preferences, and health background.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
