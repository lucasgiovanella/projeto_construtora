import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/providers/theme-provider";
import PrivateRoute from "@/components/private-route";
import { DespesasProvider } from '@/contexts/DespesasContext';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Projeto",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DespesasProvider>
            <PrivateRoute>
              {children}
            </PrivateRoute>
          </DespesasProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
