import { Providers } from './providers';
import type { Metadata } from 'next';
// import Container from "./container/Container";
// import { Inter } from "next/font/google";
import './globals.css';

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: ' AK Fine Wines - The biggest range at the best prices guaranteed!!',
  description:
    'AK Fine Wines - All of your fine wine needs at the best prices guaranteed!! Extensive range of White/Red/Sparking wines from around Australia and New Zealand',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        {/* <body className={inter.className}> */}
        <body>{children}</body>
      </html>
    </Providers>
  );
}
