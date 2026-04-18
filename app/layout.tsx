import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'EduAI - AI-Powered Learning Platform',
  description: 'Master any subject with AI-personalized learning, live classes, and gamified education for Grades 1-12 and competitive exams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>{children}</body>
    </html>
  );
}
