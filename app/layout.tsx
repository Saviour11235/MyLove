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
  title: 'A Special Message For You ❤️',
  description: 'I made something small to show you how much you mean to me. Open it when you have a second. ✨',
  
  // This is the favicon (the icon on the browser tab)
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❤️</text></svg>',
  },

  // This is for WhatsApp, Facebook, Instagram previews
  openGraph: {
    title: 'For My Favorite Person ❤️',
    description: 'A little surprise just for you...',
    type: 'website',
    // If you have a cute photo of you two, put it in /public/images/preview.jpg
    // and reference it here. If not, it will just show the text card.
    images: [
      {
        url: 'https://your-domain.com/images/mine.jpg', 
        width: 1200,
        height: 630,
        alt: 'For You',
      },
    ],
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
