import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import RecoilProvider from "@/app/RecoilProvider";
import Navbar from "@/components/Navbar/Navbar";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-spartan",
});

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Invoice App | Frontend Mentor Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RecoilProvider>
        <body
          className={`${leagueSpartan.className} ${leagueSpartan.variable}`}
        >
          <Navbar />
          {children}
        </body>
      </RecoilProvider>
    </html>
  );
}
