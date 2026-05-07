import type { Metadata } from "next";
import { Almarai, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Maseri | LABEL Textile",
  description:
    "Experience the perfect blend of elegance and modesty with Maseri fashion collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${almarai.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="font-almarai min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <div className="bg-[#F2F2F2]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
