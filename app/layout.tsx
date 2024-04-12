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
        {/* <div className="h-[10vh] flex items-center justify-center sticky top-0 left-0 bg-white z-10">
          <div className="w-[95%] flex justify-between items-center">
            <Link href="/">
              <Image src={Logo} alt="logo" className="w-[100px]" />
            </Link>

            <div className="flex items-center gap-5">
              <Link href="/notification">
                <div className="cursor-pointer rounded-full border-2 border-gray-300 p-3">
                  <Bell />
                  <div className="h-3 w-3 bg-red-500 rounded-full text-[8px] text-red-500 font-bold absolute top-5 md:top-6 z-20 right-[110px] md:right-[135px]"></div>
                </div>
              </Link>
              <Link href="/auth/login">
                <Button className="bg-lightBlue transition-all ease-in-out duration-500">
                  login
                </Button>
              </Link>
            </div>
          </div>
        </div> */}
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
