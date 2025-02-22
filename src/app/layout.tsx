import type { Metadata } from "next";
import "@/styles/index.css";
import ShareProvider from "@/context";

export const metadata: Metadata = {
  title: "Tenzies Game",
  description: "A fun dice game built with Next.js where you try to get all matching dice by rolling and locking numbers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ShareProvider>
          {children}
        </ShareProvider>
      </body>
    </html>
  );
}
