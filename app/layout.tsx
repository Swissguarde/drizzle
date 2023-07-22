import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Drizzle",
  description:
    "Design & Code Fusion: Dribbble Clone for Developers and Designers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
