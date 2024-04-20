import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import { Header } from "@/src/widgets/header";

const inter = Inter({ subsets: ["latin"] });

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Unifest",
  description: "대학교 축제 정보를 확인할 수 있는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.className}`}>
      <body>
        <div className="mx-auto flex w-full flex-col justify-center align-top md:w-[768px]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
