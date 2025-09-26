import React, { useState } from 'react';
import { Search, BookOpen, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Primeros pasos',
      icon: '🚀',
      description: 'Todo lo que necesitas para empezar',
      articles: 15
    },
    {
      id: 'selling',
      title: 'Vender productos',
      icon: '📦',
      description: 'Cómo crear y gestionar tu tienda',
      articles: 23
    },
    {
      id: 'buying',
      title: 'Comprar productos',
      icon: '🛒',
      description: 'Guías para compradores',
      articles: 12
    },
    {
      id: 'payments',
      title: 'Pagos y facturación',
      icon: '💳',
      description: 'Métodos de pago y facturación',
      articles: 18
    },
    {
      id: 'shipping',
      title: 'Envíos y entregas',
      icon: '🚚',
      description: 'Todo sobre envíos',
      articles: 9
    },
    {
      id: 'account',
      title: 'Gestión de cuenta',
      icon: '👤',
      description: 'Configuración de perfil y seguridad',
      articles: 14
    }
  ];

  const popularArticles = [
    { title: 'Cómo crear mi primera tienda', views: '2.3k', category: 'Primeros pasos' },
    { title: 'Configurar métodos de pago', views: '1.8k', category: 'Pagos' },
    { title: 'Política de devoluciones', views: '1.5k', category: 'Compras' },
    { title: 'Optimizar mi tienda para ventas', views: '1.2k', category: 'Ventas' },
    { title: 'Resolver problemas de envío', views: '987', category: 'Envíos' }
  ];

  const contactOptions = [
    {
      title: 'Chat en vivo',
      description: 'Habla con nuestro equipo ahora',
      icon: <MessageCircle className="h-6 w-6" />,
      availability: 'Disponible 24/7',
      action: 'Iniciar chat'
    },
    {
      title: 'Email',
      description: 'Envíanos un mensaje detallado',
      icon: <Mail className="h-6 w-6" />,
      availability: 'Respuesta en 24h',
      action: 'Enviar email'
    },
    {
      title: 'Teléfono',
      description: 'Llámanos para soporte urgente',
      icon: <Phone className="h-6 w-6" />,
      availability: 'Lun-Vie 9am-6pm',
      action: 'Ver números'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Centro de ayuda
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Encuentra respuestas rápidas a tus preguntas o contacta con nuestro equipo de soporte
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="¿En qué podemos ayudarte?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Categorías de ayuda
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} hover className="cursor-pointer" onClick={() => setSelectedCategory(category.id)}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {category.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.articles} artículos
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Artículos populares
        </h2>
        
        <Card>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors rounded px-3 -mx-3"
              >
                <div className="flex items-center gap-4">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {article.category} • {article.views} vistas
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Contact Support */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          ¿Necesitas más ayuda?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <Card key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {option.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {option.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {option.availability}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                {option.action}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;