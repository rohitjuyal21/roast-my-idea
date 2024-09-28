import type { Metadata } from "next";
import { Bebas_Neue, Inter, Road_Rage } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionWrapper from "@/components/SessionWrapper";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const road_rage = Road_Rage({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-road-rage",
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Roast my Idea",
  description:
    "Share your startup ideas and receive anonymous, honest feedback from the community.",
  openGraph: {
    title: "Roast my Idea",
    description:
      "Share your startup ideas and receive anonymous, honest feedback from the community.",
    url: "https://roast-my-idea.vercel.app",
    images: [
      {
        url: "https://roast-my-idea.vercel.app/images/login-meta.png",
        alt: "Roast my Idea",
      },
    ],
    siteName: "Roast my Idea",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${road_rage.variable} ${bebas_neue.variable}`}
      >
        <SessionWrapper>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </StoreProvider>
        </SessionWrapper>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
