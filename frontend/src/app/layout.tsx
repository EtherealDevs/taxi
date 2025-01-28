"use client";
import "../styles/globals.css";
import "../config/i18n";
import SocialMediaLinks from "@/components/ui/socialMedia";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Fondo con Stars */}

        <main className="relative z-10 min-h-screen bg-transparent">
          {children}
          <SocialMediaLinks />
        </main>
      </body>
    </html>
  );
}
