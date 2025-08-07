import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Sidebar />
          <main className="pl-[360px] pt-16">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
