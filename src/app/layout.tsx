import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lentera Cendekia",
  description: "Lembaga Bimbingan Belajar Anak Masa Depan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
