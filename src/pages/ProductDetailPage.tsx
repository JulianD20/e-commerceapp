import React, { useState } from 'react';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('64GB');
  const [selectedColor, setSelectedColor] = useState('Negro');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addItem } = useCart();

  const product = {
    id: '1',
    name: 'Smartphone Premium XY Pro Max',
    price: 699.99,
    originalPrice: 899.99,
    rating: 4.5,
    reviews: 128,
    sold: 450,
    sku: 'SPH-XY-001',
    vendor: {
      id: 'vendor1',
      name: 'TechStore Pro',
      rating: 4.8,
      responseTime: '2 horas',
      location: 'Madrid, España'
    },
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    variants: {
      storage: ['64GB', '128GB', '256GB'],
      color: ['Negro', 'Blanco', 'Azul']
    },
    stock: 15,
    shipping: {
      standard: { price: 9.99, days: '3-5 días' },
      express: { price: 19.99, days: '1-2 días' },
      free: { threshold: 50, days: '5-7 días' }
    },
    description: 'El smartphone más avanzado con tecnología de última generación. Cámara profesional de 108MP, procesador octacore, batería de larga duración y diseño premium resistente al agua.',
    specifications: [
      { label: 'Pantalla', value: '6.7" OLED 120Hz' },
      { label: 'Procesador', value: 'Snapdragon 8 Gen 2' },
      { label: 'RAM', value: '8GB / 12GB' },
      { label: 'Cámara', value: '108MP + 12MP + 12MP' },
      { label: 'Batería', value: '4800mAh' },
      { label: 'OS', value: 'Android 14' }
    ],
    reviews: [
      {
        id: '1',
        user: 'Carlos M.',
        rating: 5,
        comment: 'Excelente calidad, la cámara es increíble',
        date: '2025-01-10',
        verified: true
      },
      {
        id: '2',
        user: 'Ana S.',
        rating: 4,
        comment: 'Muy buen rendimiento, la batería dura todo el día',
        date: '2025-01-08',
        verified: true
      }
    ]
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      vendorId: product.vendor.id,
      vendorName: product.vendor.name,
      variant: `${selectedVariant} - ${selectedColor}`,
      quantity
    });
  };

  const savings = product.originalPrice - product.price;
  const discountPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Inicio</a></li>
          <li>→</li>
          <li><a href="/marketplace" className="hover:text-indigo-600 dark:hover:text-indigo-400">Electrónicos</a></li>
          <li>→</li>
          <li className="text-gray-900 dark:text-gray-100">Smartphones</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative mb-4 group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            
            {/* Image Navigation */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
              icon={<ChevronLeft className="h-4 w-4" />}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
              icon={<ChevronRight className="h-4 w-4" />}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge variant="error">-{discountPercentage}%</Badge>
              <Badge variant="success">Envío gratis</Badge>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-indigo-500'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`Vista ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Vendor Info */}
          <div className="mb-4">
            <a
              href={`/store/${product.vendor.id}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              {product.vendor.name}
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              {product.vendor.rating}
            </a>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {product.name}
          </h1>

          {/* Rating and Social */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviews} reseñas)
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.sold} vendidos
              </span>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" icon={<Heart className="h-4 w-4" />}>
                <span className="sr-only">Favoritos</span>
              </Button>
              <Button variant="ghost" size="sm" icon={<Share2 className="h-4 w-4" />}>
                <span className="sr-only">Compartir</span>
              </Button>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                ${product.price}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice}
              </span>
              <Badge variant="success">
                Ahorras ${savings.toFixed(2)}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Precio incluye impuestos
            </p>
          </div>

          {/* Variants */}
          <div className="mb-6 space-y-4">
            {/* Storage */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Almacenamiento</h3>
              <div className="flex gap-2">
                {product.variants.storage.map((variant) => (
                  <Button
                    key={variant}
                    variant={selectedVariant === variant ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Color</h3>
              <div className="flex gap-2">
                {product.variants.color.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <Badge variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}>
              {product.stock > 10 
                ? 'En stock' 
                : product.stock > 0 
                  ? `Solo ${product.stock} disponibles` 
                  : 'Agotado'
              }
            </Badge>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 text-gray-900 dark:text-gray-100">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </Button>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.stock} disponibles
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                icon={<ShoppingCart className="h-5 w-5" />}
              >
                Añadir al carrito
              </Button>
              <Button variant="secondary" size="lg">
                Comprar ahora
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <Card className="mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Envío gratis</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">En pedidos mayores a $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Garantía del vendedor</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">12 meses de garantía oficial</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Devoluciones</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">30 días para devolver</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Vendor Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Contactar vendedor
            </Button>
            <Button variant="ghost">
              Ver tienda
            </Button>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'description', label: 'Descripción' },
              { id: 'specifications', label: 'Especificaciones' },
              { id: 'reviews', label: 'Reseñas (128)' },
              { id: 'qa', label: 'Preguntas (5)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
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

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'description' && (
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Descripción del producto
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </Card>
            )}

            {activeTab === 'specifications' && (
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Especificaciones técnicas
                </h3>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {spec.label}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'reviews' && (
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Reseñas de clientes
                </h3>
                
                {/* Reviews Summary */}
                <div className="flex items-center gap-8 mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {product.rating}
                    </div>
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.reviews} reseñas
                    </p>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                          {stars}★
                        </span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-yellow-400 rounded-full h-2"
                            style={{ width: `${stars === 5 ? 60 : stars === 4 ? 30 : 10}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                          {stars === 5 ? 60 : stars === 4 ? 30 : 10}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {review.user[0]}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {review.user}
                            </span>
                            {review.verified && (
                              <Badge variant="success" size="sm">Verificado</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button variant="outline">
                    Ver todas las reseñas
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vendor Card */}
            <Card>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Información del vendedor
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {product.vendor.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {product.vendor.rating} • {product.vendor.location}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tiempo de respuesta: {product.vendor.responseTime}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Visitar tienda
                </Button>
              </div>
            </Card>

            {/* Shipping Calculator */}
            <Card>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Calcular envío
              </h4>
              <Input
                placeholder="Código postal"
                className="mb-3"
              />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Estándar</span>
                  <span>${product.shipping.standard.price} - {product.shipping.standard.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Express</span>
                  <span>${product.shipping.express.price} - {product.shipping.express.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Gratis</span>
                  <span>Pedidos +$50 - {product.shipping.free.days}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Productos relacionados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;