import React, { useState } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

const MarketplacePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const products = [
    {
      id: '1',
      name: 'Smartphone Premium XY con cámara profesional',
      price: 699.99,
      originalPrice: 899.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: 'TechStore Pro',
      vendorId: 'vendor1',
      badges: ['Envío gratis', 'Oferta'],
      inStock: true
    },
    {
      id: '2',
      name: 'Auriculares Inalámbricos HD con cancelación de ruido',
      price: 159.99,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: 'AudioMaster',
      vendorId: 'vendor2',
      badges: ['Nuevo'],
      inStock: true
    },
    {
      id: '3',
      name: 'Laptop Gaming RGB de alto rendimiento',
      price: 1299.99,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      vendorName: 'GamerHub',
      vendorId: 'vendor3',
      badges: ['Popular'],
      inStock: true
    },
    {
      id: '4',
      name: 'Reloj Inteligente Deportivo',
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.6,
      reviews: 203,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: 'SportTech',
      vendorId: 'vendor4',
      badges: ['Envío gratis'],
      inStock: true
    },
    {
      id: '5',
      name: 'Cámara Digital Profesional',
      price: 899.99,
      rating: 4.9,
      reviews: 67,
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: 'FotoExpert',
      vendorId: 'vendor5',
      inStock: false
    },
    {
      id: '6',
      name: 'Zapatillas Running Premium',
      price: 189.99,
      originalPrice: 229.99,
      rating: 4.4,
      reviews: 145,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      vendorName: 'RunStyle',
      vendorId: 'vendor6',
      badges: ['Oferta'],
      inStock: true
    }
  ];

  const categories = [
    'Electrónicos',
    'Moda y Accesorios',
    'Hogar y Jardín',
    'Deportes y Fitness',
    'Belleza y Cuidado',
    'Libros y Medios',
    'Automotriz',
    'Juguetes y Juegos'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Marketplace
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {products.length} productos encontrados
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Más relevantes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Mejor calificados</option>
              <option>Más vendidos</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                className="rounded-none border-0"
                onClick={() => setViewMode('grid')}
                icon={<Grid className="h-4 w-4" />}
              >
                <span className="sr-only">Vista grid</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                className="rounded-none border-0 border-l border-gray-300 dark:border-gray-600"
                onClick={() => setViewMode('list')}
                icon={<List className="h-4 w-4" />}
              >
                <span className="sr-only">Vista lista</span>
              </Button>
            </div>

            {/* Filters Toggle (Mobile) */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
              icon={<SlidersHorizontal className="h-4 w-4" />}
            >
              Filtros
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Filtros</h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Categorías</h4>
              <div className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Rango de precio</h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Min" value={priceRange[0]} onChange={() => {}} />
                  <Input placeholder="Max" value={priceRange[1]} onChange={() => {}} />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Calificación</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {stars}+ estrellas
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Otros filtros</h4>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Envío gratis</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">En oferta</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Disponible</span>
              </label>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Cargar más productos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;