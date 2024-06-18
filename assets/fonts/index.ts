import localFont from "next/font/local";

export const fontSans = localFont({
  src: "Inter-Variable.ttf",
  variable: "--font-sans",
})

export const fontUrban = localFont({
  src: 'Urbanist-Variable.ttf',
  variable: "--font-urban",
})

export const fontHeading = localFont({
  src: "./CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const fontCode = localFont({
  src: "./FiraCode-Regular.woff2",
  variable: "--font-code",
})