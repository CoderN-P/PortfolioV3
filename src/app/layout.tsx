import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import Navbar from "@/app/components/nav";
import Breadcrumb from "@/app/components/Breadcrumb";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="bg-white">
    <body className="bg-white">
    <NextTopLoader />
    <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
    >
        <Navbar/>
        <div className="w-full lg:max-w-[800px] mb-20 mx-auto px-4 sm:px-8 bg-white text-black flex-grow">
          <div className={'mt-12 mb-8'}>
            <Breadcrumb/>
          </div>
          {children}
        </div>
        
        {/* Global Footer */}
        <Footer />
    </div>
    </body>
    </html>
  );
}
