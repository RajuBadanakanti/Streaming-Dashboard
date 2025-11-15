import "./globals.css";
import Header from './components/Header'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streaming Dashboard",
  description: "A modern streaming dashboard built with Next.js + TMDB API",
  icons: {
    icon: [
      "/favicon.ico?v=2",
    ],
  },

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">

      <body className="bg-black text-white">
        <Header />   {/* Global navbar */}
        <main className="pt-20 max-w-[1400px] mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
