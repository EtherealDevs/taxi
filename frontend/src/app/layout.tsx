"use client";
import "../styles/globals.css";
import '../config/i18n';
import Stars from "../components/Stars";
import SocialMediaLinks from "@/components/ui/socialMedia";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >

        {/* Fondo con Stars */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <Stars />
        </div>

        <main className="relative z-10 min-h-screen bg-transparent">
          {children}
          <SocialMediaLinks />
        </main>
      </body>
    </html>
  );
}