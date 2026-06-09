import type { Metadata } from "next";
import { Assistant, Heebo } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getNavigation, getSite } from "@/lib/content/loaders";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const site = getSite();
const navigation = getNavigation();

export const metadata: Metadata = {
  title: {
    default: site.seo.defaultTitle,
    template: `%s | Cube Financial Group`,
  },
  description: site.seo.defaultDescription,
  metadataBase: new URL("https://cube-financial.co.il"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} ${assistant.variable} font-sans antialiased`}>
        <SiteHeader nav={navigation.main} cta={navigation.cta} />
        <main>{children}</main>
        <SiteFooter
          company={navigation.footer.company}
          legal={navigation.footer.legal}
          insuranceNote={navigation.footer.insuranceNote}
        />
      </body>
    </html>
  );
}
