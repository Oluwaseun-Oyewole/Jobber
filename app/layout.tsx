"use client";

import { AppStore, store } from "@/lib/store";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { sans } from "./fonts";
import "./globals.scss";
import Provider from "./provider/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>();
  1;
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <html lang="en">
      <head>
        <title>Jobber</title>
        <meta name="hr360" content="hr360 dashboard" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </head>

      <body className={`${sans.className}`}>
        <Toaster position="top-center" />
        <ReduxProvider store={storeRef.current}>
          <main className="w-full flex items-center justify-center bg-lightGray">
            <div className="w-full h-screen overscroll-none">
              <Provider>{children} </Provider>
            </div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
