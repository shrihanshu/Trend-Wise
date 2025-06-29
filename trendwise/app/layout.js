import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TrendWise',
  description: 'AI-powered blog from trending content.',
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <main className="flex-1">{children}</main>
          <footer className="bg-muted/50 text-center py-4 text-gray-200">
            <p>© TrendWise – Powered by OpenAI & Next.js</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
