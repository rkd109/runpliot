import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../src/context/auth-context";

export const metadata: Metadata = {
  title: "RunPilot",
  description: "Running plan portfolio application"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
