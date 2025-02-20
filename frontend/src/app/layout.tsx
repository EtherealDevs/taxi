import "../styles/globals.css";

export const metadata = {
  title: "Taxi Nelson - Viajes Seguros",
  description: "Servicio de viajes rápido y confiable.",
  keywords:
    "taxi, viajes, transporte, traslados, aeropuerto, seguro, internacional, nacional, local",
  icons: {
    icon: "/favicon.ico", // Para navegadores normales
    shortcut: "/favicon.ico", // Para accesos directos
    apple: "/apple-touch-icon.png",
  },
};

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
        </main>
      </body>
    </html>
  );
}
