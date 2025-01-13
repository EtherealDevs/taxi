"use client";
import "../styles/globals.css";
import '../config/i18n';
/* import { genos } from "@/config/fonts";
 */

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
            backgroundColor: "black",
            overflow: "hidden",
          }}
        >
        </div>


        <main className="relative z-10 min-h-screen bg-transparent">
          {children}
        </main>
      </body>
    </html>
  );
}