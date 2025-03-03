import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/src/widgets/header";
import { pretendard } from "@/src/shared/lib/fonts";
import { BoothDraftStoreProvider } from "@/src/shared/model/provider/booth-draft-store-provider";
import { MSWProvider } from "@/src/app/ui/MSWProvider";
import { BoothListStoreProvider } from "@/src/shared/model/provider/booth-list-store-provider";
import { BoothEditStoreProvider } from "@/src/shared/model/provider/booth-edit-store.provider";
import { BoothDetailsDraftStoreProvider } from "@/src/shared/model/provider/booth-details-draft-store-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GlobalErrorFallback } from "@/src/app/ui/global-error-fallback";
import { ErrorBoundary } from "react-error-boundary";

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
        <MSWProvider>
          <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
            <BoothDetailsDraftStoreProvider>
              <BoothEditStoreProvider>
                <BoothDraftStoreProvider>
                  <BoothListStoreProvider>
                    <div className="mx-auto flex min-h-screen flex-col items-stretch justify-start sm:w-[640px]">
                      <Header />
                      <div className="flex flex-auto flex-col items-stretch justify-start px-5">
                        {children}
                      </div>
                    </div>
                  </BoothListStoreProvider>
                </BoothDraftStoreProvider>
              </BoothEditStoreProvider>
            </BoothDetailsDraftStoreProvider>
          </ErrorBoundary>
        </MSWProvider>
      </body>
      <GoogleAnalytics gaId="G-7WTXSFSS6M" />
    </html>
  );
}
