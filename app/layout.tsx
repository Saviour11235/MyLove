import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  // 1. This is the tab title
  title: 'A Special Message For You ❤️',
  description: 'I made something small for you. Open it! ✨',
  
  // 2. Browser Favicon
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❤️</text></svg>',
  },

  // 3. WhatsApp / Social Media Preview
  openGraph: {
    title: 'For My Favorite Person ❤️',
    description: 'A little surprise just for you...',
    url: 'https://your-special-site.vercel.app', // CHANGE THIS TO YOUR ACTUAL URL
    siteName: 'My Special Message',
    images: [
      {
        // Use an absolute URL. WhatsApp often fails with relative paths.
        url: 'https://your-special-site.vercel.app/images/mine.jpg', 
        width: 1200,
        height: 630,
        alt: 'A special surprise',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
