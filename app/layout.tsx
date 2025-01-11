import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./components/ThemeToggle";
import Link from "next/link";
import { PawPrint } from "lucide-react";



export const metadata: Metadata = {
  title: "Animly",
  description: "Explore Animly, your modern animal encyclopedia designed for nature enthusiasts and wildlife lovers. Discover fascinating facts, habitats, and behaviors about animals from around the globe. Whether you're researching for school, planning an adventure, or simply curious about the animal kingdom, Animly offers detailed, engaging, and easy-to-read content. Start your journey into the wild today with Animly!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white dark:bg-gray-800 shadow-md">
              <div className="container mx-auto px-6 py-2 md:px-10 md:py-4 flex justify-between items-center">
                <Link href='/' className="flex flex-col items-center justify-center">
                  <PawPrint className="h-6 w-6 md:h-9 md:w-9" /> Animly
                </Link>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-white dark:bg-gray-900 shadow-md">
              <div className="container mx-auto px-4 py-4 text-center">
              <p>&copy; {new Date().getFullYear()} Animly. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
