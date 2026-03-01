import type { Metadata } from "next";
import { Sora, Instrument_Serif, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { StoreHydrator } from "@/components/StoreHydrator";
import { Navigation } from "@/components/Navigation";
import { FilmGrain } from "@/components/FilmGrain";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-sora",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIREPATH — 财务自由计算器",
  description:
    "计算你的FIRE时间线。输入收入、支出和净资产，获得精确的财务自由退休日期。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`dark ${sora.variable} ${instrumentSerif.variable} ${notoSansSC.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <StoreHydrator />
        <Navigation />
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}
