import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const kindSans = localFont({
  src: "./fonts/kind-sans-thin.otf",
  variable: "--font-kind-sans",
  weight: "100 900",
});

const Baguede = localFont({
  src: "./fonts/BaguedeFree-Regular.otf",
  variable: "--font-baguede",
  weight: "100 900",
});

const Articulate = localFont({
  src: [
    {
      path: "./fonts/Articulat_CF/fonnts.com-Articulat_CF_Normal.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Articulat_CF/fonnts.com-Articulat_CF_Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/Articulat_CF/fonnts.com-Articulat_CF_Medium.otf",
      weight: "500",
      style: "medium",
    },
  ],
  variable: "--font-articulate",
});

export const metadata: Metadata = {
  title: "KidneyHealth AI",
  description:
    "KidneyHealth_ai is a web application that uses machine learning to classify kidney diseases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/KidneyDiseaseAI_Logo.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kindSans.variable} ${Baguede.variable} ${Articulate.className} antialiased`}
      >
        <div className=" flex flex-col w-full h-full relative ">
          <Navbar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
