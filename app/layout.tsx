import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // This helps prevent hydration mismatches
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sentient AI | AI-Powered Education for Indian Primary Schools',
  description: 'Revolutionizing primary school education in India with AI-powered learning buddies. Personalized learning paths, curriculum alignment, and progress tracking for every child.',
  keywords: 'AI education, primary school, India, educational technology, personalized learning, AI learning buddy',
  authors: [{ name: 'Sentient AI' }],
  openGraph: {
    title: 'Sentient AI | AI-Powered Education Revolution',
    description: 'Transforming primary education in India with intelligent learning companions',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentient AI | AI-Powered Education',
    description: 'Revolutionizing primary school education in India with AI learning buddies',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}