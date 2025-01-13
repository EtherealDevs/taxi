'use client'

import { Facebook, Twitter, Instagram } from 'lucide-react'
import { ReactNode } from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">ChoferConnect</h3>
            <p className="text-sm text-gray-600">Conectando pasajeros y choferes de calidad</p>
          </div>
          <div className="flex space-x-4">
            <SocialLink href="#" icon={<Facebook />} />
            <SocialLink href="#" icon={<Twitter />} />
            <SocialLink href="#" icon={<Instagram />} />
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>&copy; 2023 ChoferConnect. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
    >
      {icon}
    </a>
  );
}

