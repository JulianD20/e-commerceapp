import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter */}
        <div className="mb-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Mantente al día</h3>
          <p className="text-gray-400 mb-4">Recibe las últimas ofertas y novedades</p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              placeholder="Tu email"
              className="flex-1"
            />
            <Button variant="primary">
              Suscribirme
            </Button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-3">CachMarket</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">Quiénes Somos</a></li>
              <li><a href="/mission" className="hover:text-white transition-colors">Misión y Visión</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Trabajos</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Vendedores</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/sell" className="hover:text-white transition-colors">Vender</a></li>
              <li><a href="/plans" className="hover:text-white transition-colors">Planes</a></li>
              <li><a href="/tools" className="hover:text-white transition-colors">Herramientas</a></li>
              <li><a href="/success-stories" className="hover:text-white transition-colors">Casos de éxito</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/help" className="hover:text-white transition-colors">Centro de ayuda</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Envíos</a></li>
              <li><a href="/returns" className="hover:text-white transition-colors">Devoluciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Términos</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              CachMarket
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              © 2025 CachMarket. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" icon={<Facebook className="h-4 w-4" />}>
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="ghost" size="sm" icon={<Twitter className="h-4 w-4" />}>
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="ghost" size="sm" icon={<Instagram className="h-4 w-4" />}>
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="ghost" size="sm" icon={<Mail className="h-4 w-4" />}>
              <span className="sr-only">Email</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;