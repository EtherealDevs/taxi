import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nelsonoliveraviajes.com",
        pathname: "/storage/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Aplica a todas las rutas
        headers: [
          { key: "X-Frame-Options", value: "DENY" }, // Evita clickjacking
          { key: "X-Content-Type-Options", value: "nosniff" }, // Evita MIME-type sniffing
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // Controla el referrer
          { key: "Permissions-Policy", value: "geolocation=(), microphone=()" }, // Bloquea permisos no deseados
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          }, // Fuerza HTTPS
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'",
          }, // Controla fuentes de contenido
        ],
      },
    ];
  },
};

export default nextConfig;
