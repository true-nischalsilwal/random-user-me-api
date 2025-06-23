import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import StoreProvider from './store/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Random User Generator',
  description: 'A Next.js app that fetches random user data using Redux and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}