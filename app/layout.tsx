import type { Metadata } from "next";
import "./globals.css";
import {
  Roboto,
  Baloo_Da_2,
  Roboto_Condensed,
  Lisu_Bosa,
  Lily_Script_One,
  Rosario,
  RocknRoll_One,
  Sansation,
  Salsa,
} from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
});
const balooDa2 = Baloo_Da_2({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-baloo-da-2",
});
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-condensed",
});
const lisuBosa = Lisu_Bosa({
  subsets: ["latin"],
  weight: ["200"],
  variable: "--font-lisu-bosa",
});
const lilyScriptOne = Lily_Script_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lily-script-one",
});
const rosario = Rosario({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-rosario",
});
const rocknRollOne = RocknRoll_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rocknroll-one",
});
const sansation = Sansation({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-sansation",
});
const salsa = Salsa({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-salsa",
});

export const metadata: Metadata = {
  title: "FocusFlaw",
  description:
    "A productive pomodoro app with a minimalist, beautiful and modern aesthetic design.",
  // Adds to <head>: <meta name="apple-mobile-web-app-title" content="FocusFlaw" />
  // (favicon.ico, icon0.svg, icon1.png, apple-icon.png and manifest.json are
  // picked up automatically from the app folder as metadata file conventions)
  appleWebApp: {
    title: "FocusFlaw",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${balooDa2.variable} ${robotoCondensed.variable} ${lisuBosa.variable} ${lilyScriptOne.variable} ${rosario.variable} ${rocknRollOne.variable} ${sansation.variable} ${salsa.variable} h-full antialiased`}
      // Extensions (e.g. crxemulator, Bitdefender) mutate <html> before React loads.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-canvas" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
