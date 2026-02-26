import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Osservatorio Criminalita Italia",
  description: "Dati e analisi sulla criminalita in Italia con fonti ufficiali ISTAT",
  openGraph: {
    title: "Osservatorio Criminalita Italia",
    description: "Dati e analisi sulla criminalita in Italia 2014-2023 con fonti ufficiali ISTAT",
    type: "website",
    locale: "it_IT",
    url: "https://albgri.github.io/osservatorio-criminalita-next",
    siteName: "Osservatorio Criminalita Italia",
  },
  twitter: {
    card: "summary",
    title: "Osservatorio Criminalita Italia",
    description: "Dati e analisi sulla criminalita in Italia 2014-2023 con fonti ufficiali ISTAT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="min-h-[calc(100vh-3.5rem)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
