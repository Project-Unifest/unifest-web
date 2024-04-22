import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/src/widgets/header";
import { pretendard } from "@/src/shared/lib/fonts";

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
    <html lang="kr" className={pretendard.className}>
      <body>
        <div className="mx-auto flex w-full flex-col justify-center align-top md:w-[768px]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
