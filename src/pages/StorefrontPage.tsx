import React, { useState } from 'react';
import { Star, MapPin, Clock, MessageCircle, Heart, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';

const StorefrontPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  const store = {
    id: 'vendor1',
    name: 'TechStore Pro',
    description: 'Tu tienda de confianza para tecnología premium. Más de 5 años ofreciendo los mejores productos con garantía oficial.',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200',
    banner: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.8,
    reviews: 1247,
    totalSales: 5234,
    responseTime: '2 horas',
    location: 'Madrid, España',
    founded: '2020',
    followers: 856,
    categories: ['Smartphones', 'Laptops', 'Accesorios', 'Audio'],
    policies: {
      shipping: 'Envío gratis en pedidos mayores a €50. Envío estándar 3-5 días.',
      returns: '30 días para devoluciones. Producto debe estar en condiciones originales.',
      warranty: 'Garantía oficial del fabricante. Soporte técnico incluido.'
    }
  };

  const storeProducts = [
    {
      id: '1',
      name: 'Smartphone Premium XY',
      price: 699.99,
      originalPrice: 899.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: store.name,
      vendorId: store.id,
      badges: ['Envío gratis', 'Oferta'],
      inStock: true
    },
    {
      id: '2',
      name: 'Auriculares Inalámbricos HD',
      price: 159.99,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: store.name,
      vendorId: store.id,
      badges: ['Nuevo'],
      inStock: true
    },
    {
      id: '3',
      name: 'Laptop Gaming RGB',
      price: 1299.99,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      vendorName: store.name,
      vendorId: store.id,
      badges: ['Popular'],
      inStock: true
    },
    {
      id: '4',
      name: 'Cargador Inalámbrico',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.3,
      reviews: 34,
      image: 'https://images.pexels.com/photos/4354618/pexels-photo-4354618.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: store.name,
      vendorId: store.id,
      badges: ['Oferta'],
      inStock: true
    }
  ];

  const tabs = [
    { id: 'products', label: `Productos (${storeProducts.length})` },
    { id: 'about', label: 'Sobre la tienda' },
    { id: 'reviews', label: `Opiniones (${store.reviews})` },
    { id: 'policies', label: 'Políticas' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Store Header */}
      <div className="mb-8">
        {/* Banner */}
        <div className="relative h-48 lg:h-64 rounded-xl overflow-hidden mb-6">
          <img
            src={store.banner}
            alt={`${store.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          {/* Store Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div className="flex items-end gap-4">
                <img
                  src={store.logo}
                  alt={`${store.name} logo`}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-white shadow-lg"
                />
                <div className="text-white mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-1">{store.name}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{store.rating}</span>
                      <span className="opacity-75">({store.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{store.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  icon={<Heart className="h-4 w-4" />}
                >
                  Seguir ({store.followers})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white/10"
                  icon={<MessageCircle className="h-4 w-4" />}
                >
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Store Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {store.totalSales.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Ventas totales</p>
          </Card>
          
          <Card padding="sm" className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {store.rating}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Calificación</p>
          </Card>
          
          <Card padding="sm" className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-green-600" />
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {store.responseTime}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Respuesta</p>
          </Card>
          
          <Card padding="sm" className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {store.founded}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Desde</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 dark:text-gray-300">
                  {storeProducts.length} productos
                </span>
                <div className="flex gap-2">
                  {store.categories.map((category) => (
                    <Badge key={category} size="sm">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm">
                  <option>Más populares</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Más nuevos</option>
                </select>
                <Button variant="ghost" size="sm" icon={<Filter className="h-4 w-4" />}>
                  <span className="sr-only">Filtros</span>
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storeProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="max-w-4xl">
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Sobre {store.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {store.description}
              </p>
              
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Información</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Ubicación</span>
                      <span className="text-gray-900 dark:text-gray-100">{store.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Fundada en</span>
                      <span className="text-gray-900 dark:text-gray-100">{store.founded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tiempo de respuesta</span>
                      <span className="text-gray-900 dark:text-gray-100">{store.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Categorías</h4>
                  <div className="flex flex-wrap gap-2">
                    {store.categories.map((category) => (
                      <Badge key={category}>{category}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="max-w-4xl space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Política de envíos
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {store.policies.shipping}
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Política de devoluciones
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {store.policies.returns}
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Garantía
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {store.policies.warranty}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorefrontPage;