import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Byte Rollers | Brand + Product Engineering Studio",
  description: "Premium websites, MVPs, and internal systems built with precision and product thinking. We design brands and engineer products that scale.",
  keywords: ["web development", "brand design", "MVP", "product engineering", "clinic software", "automation", "Australia", "US"],
  authors: [{ name: "Byte Rollers" }],
  openGraph: {
    title: "Byte Rollers | Brand + Product Engineering Studio",
    description: "Premium websites, MVPs, and internal systems built with precision and product thinking.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Byte Rollers | Brand + Product Engineering Studio",
    description: "Premium websites, MVPs, and internal systems built with precision and product thinking.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased bg-[#0B0F14] text-[#EAEFF5]`}
      >
        {children}
      </body>
    </html>
  );
}
