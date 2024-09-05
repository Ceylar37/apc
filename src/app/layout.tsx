import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { QueryClientProvider } from '@/lib/query-client-provider';
import { Header } from '@/widgets/header';
import { ThemeProvider } from '@/features/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'APC'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'min-h-screen grid grid-rows-[auto_1fr]')}>
        <ThemeProvider>
          <QueryClientProvider>
            <Header />
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
