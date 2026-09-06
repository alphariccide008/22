import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = "https://sabiocast.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SabioCast — Multilingual live streaming made effortless",
    template: "%s — SabioCast",
  },
  description:
    "SabioCast delivers live streams with multiple audio languages and pin-sharp AI closed captions. Viewers anywhere pick their language in our multilingual player.",
  keywords: [
    "multilingual live streaming",
    "AI live captions",
    "AI speech translation",
    "remote simultaneous interpretation",
    "live subtitling",
    "webinar platform",
  ],
  openGraph: {
    title: "SabioCast — Multilingual live streaming made effortless",
    description:
      "Live streams with multiple audio languages and 99+% accurate AI closed captions, delivered worldwide.",
    url: siteUrl,
    siteName: "SabioCast",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document,r=d.documentElement;r.classList.add('js-anim');setTimeout(function(){d.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in-view')})},3000)}catch(e){}})();`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
