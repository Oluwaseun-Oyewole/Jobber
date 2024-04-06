import { DM_Sans, Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const sans = DM_Sans({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
});
