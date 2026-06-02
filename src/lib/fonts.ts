import localFont from "next/font/local";

/** Geist — única familia sans para UI, headings y body (sin serif) */
export const fontSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--f-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const fontMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--f-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});
