import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focus Flaw ",
  description: "A Productive pomodoro app with minimalist , beautiful and modern aesthetic design.",
  // Adds to <head>: <meta name="apple-mobile-web-app-title" content="Focus Flaw" />
  // (favicon.ico, icon0.svg, icon1.png, apple-icon.png and manifest.json are
  // picked up automatically from the app folder as metadata file conventions)
  appleWebApp: {
    title: "Focus Flaw",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // Extensions (e.g. crxemulator, Bitdefender) mutate <html> before React loads.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#f8f5ef]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
