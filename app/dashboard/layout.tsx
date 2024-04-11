import { outfit } from "../fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <main className="w-full flex items-center justify-center bg-lightGray">
          <div className="w-[95%] h-screen overscroll-none">{children}</div>
        </main>
      </body>
    </html>
  );
}
