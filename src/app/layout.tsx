import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

export const metadata: Metadata = {
  title: "Zebra Resource Planning",
  description: "Resource planning and allocation management for Zebra Technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientProviders>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
