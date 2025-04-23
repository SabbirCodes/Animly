import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./components/ThemeToggle";
import Link from "next/link";
import { PawPrint } from "lucide-react";

export const metadata: Metadata = {
  title: "Animly - Simple Animal Encyclopedia",
  description:
    "Explore Animly, your modern animal encyclopedia designed for nature enthusiasts and wildlife lovers. Discover fascinating facts, habitats, and behaviors about animals from around the globe. Whether you're researching for school, planning an adventure, or simply curious about the animal kingdom, Animly offers detailed, engaging, and easy-to-read content. Start your journey into the wild today with Animly!",
  keywords:
    "animly.vercel.app, animly, vercel animals, animal facts, wildlife, habitats, animal encyclopedia, nature, wildlife research, animal behaviors",
  openGraph: {
    title: "Animly - Modern Animal Encyclopedia",
    description:
      "Explore fascinating animal facts and behaviors with Animly, the ultimate wildlife resource.",
    url: "https://animly.vercel.app",
    images: [
      {
        url: "https://animly.vercel.app/animlydemo.png",
        width: 1200,
        height: 630,
        alt: "Animly - Modern Animal Encyclopedia",
      },
    ],
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
        className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white dark:bg-gray-800 shadow-md">
              <nav className="container mx-auto px-6 py-2 md:px-10 md:py-4 flex justify-between items-center">
                <Link
                  href="/"
                  className="flex flex-col items-center justify-center"
                >
                  <PawPrint className="h-6 w-6 md:h-9 md:w-9" /> Animly
                </Link>
                <ThemeToggle />
              </nav>
            </header>
            <main className="flex-grow container mx-auto md:px-4 md:py-8">
              {children}
            </main>
            <footer className="bg-white dark:bg-gray-900 shadow-md">
              <div className="container mx-auto px-4 py-4 text-center">
                <p>
                  &copy; {new Date().getFullYear()} Animly. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
