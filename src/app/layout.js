import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/common/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://mohamedadow.ke"),
  title: {
    default: "Hon. Mohamed Adow | Member of Parliament - Wajir South",
    template: "%s | Hon. Mohamed Adow",
  },
  description:
    "Official website of Hon. Mohamed Adow, Member of Parliament for Wajir South. Explore projects, news, events, and constituency services.",
  openGraph: {
    title: "Hon. Mohamed Adow | Member of Parliament - Wajir South",
    description:
      "Serving with integrity, building with purpose. Learn about ongoing projects, legislative work, and community services.",
    url: "https://mohamedadow.ke",
    siteName: "Mohamed Adow MP",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Hon. Mohamed Adow addressing constituents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@MohamedAdowMP",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
