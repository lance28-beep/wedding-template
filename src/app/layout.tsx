import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

const inter = localFont({
  src: './fonts/inter.woff2',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "Wedding Theme",
    template: "%s | Wedding Theme"
  },
  description: "A beautiful wedding theme for your special day. Create unforgettable memories with our elegant and customizable wedding website template.",
  keywords: ["wedding", "wedding website", "wedding theme", "wedding template", "wedding planning"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-wedding-website.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Wedding Theme",
    description: "A beautiful wedding theme for your special day",
    url: 'https://your-wedding-website.com',
    siteName: 'Wedding Theme',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Theme Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wedding Theme",
    description: "A beautiful wedding theme for your special day",
    images: ['/twitter-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
