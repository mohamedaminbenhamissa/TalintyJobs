import { Inter } from "next/font/google";
import "./globals.css";
import { SideNav } from "@/component/ui/navbar";
import { Box } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Description } from "@mui/icons-material";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talinty",
  description: "ok",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const isRTL = locale === "ar";
  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Box display="flex">
            <SideNav />
            <Box padding={2} flex={1}>
              {children}
            </Box>
          </Box>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
