import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CartToastContainer } from "@/components/shared/CartToast";
import { Providers } from "@/lib/context/Providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "МЕБЕЛЬ.маркет — Мебель и товары для дома",
  description:
    "Интернет-магазин мебели с доставкой по всей России. Более 50 000 товаров.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans">
        <Providers>
          <Header />
          <div className="flex-1 animate-[pageIn_0.3s_ease]">{children}</div>
          <Footer />
          <MobileBottomBar />
          <CartToastContainer />
        </Providers>
      </body>
    </html>
  );
}
