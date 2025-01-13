"use client";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

        {/* Contenido principal */}
        <Navbar />
        <main className="relative z-10 min-h-screen bg-transparent">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}