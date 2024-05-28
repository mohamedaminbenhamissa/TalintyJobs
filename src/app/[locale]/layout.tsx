import { Inter } from "next/font/google";
import "./globals.css";
import { SideNav } from "@/component/ui/navbar";
import { Box } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talinty",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  const isRTL = locale === "ar";
  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Box display="flex">
       
            <Box padding={2} flex={1}>
              {children}
            </Box>
          </Box>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
