import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import RecoilProvider from "@/app/RecoilProvider";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-spartan",
});

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Invoice App | Frontend Mentor Challenge",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session?.user);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <RecoilProvider>
          <body
            id="bodyPage"
            style={{ colorScheme: "dark" }}
            className={`${leagueSpartan.className} ${leagueSpartan.variable} dark`}
          >
            <Navbar />
            {children}
          </body>
        </RecoilProvider>
      </SessionProvider>
    </html>
  );
}
