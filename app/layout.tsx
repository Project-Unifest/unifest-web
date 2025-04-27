"use client";

import "./globals.css";
import { Header } from "@/src/widgets/header";
import { pretendard } from "@/src/shared/lib/fonts";
import { MSWProvider } from "@/src/app/ui/MSWProvider";

import { GoogleAnalytics } from "@next/third-parties/google";
import { QueryProvider } from "@/src/shared/model/provider/query-provider";
import GlobalFallbackProvider from "@/src/app/ui/global-fallback-provider";
import { HydrationGate } from "@/src/app/model/HydrationGate";

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={pretendard.className}>
      <body>
        <MSWProvider>
          <QueryProvider>
            <GlobalFallbackProvider>
              <HydrationGate>
                <div className="mx-auto flex min-h-screen flex-col items-stretch justify-start sm:w-[640px]">
                  <Header />
                  <div className="flex flex-auto flex-col items-stretch justify-start px-5">
                    {children}
                  </div>
                </div>
              </HydrationGate>
            </GlobalFallbackProvider>
          </QueryProvider>
        </MSWProvider>
      </body>
      <GoogleAnalytics gaId="G-7WTXSFSS6M" />
    </html>
  );
}
