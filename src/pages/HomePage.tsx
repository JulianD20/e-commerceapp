import React from 'react';
import { ArrowRight, ShoppingBag, TrendingUp, Shield, Zap, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Smartphone Premium XY',
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
      name: 'Auriculares Inalámbricos HD',
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
      name: 'Laptop Gaming RGB',
      price: 1299.99,
      rating: 4.7,
      reviews: 56,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      vendorName: 'GamerHub',
      vendorId: 'vendor3',
      badges: ['Popular'],
      inStock: true
    }
  ];

  const benefits = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: 'Fácil configuración',
      description: 'Crea tu tienda en minutos con nuestro asistente intuitivo'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Crece sin límites',
      description: 'Herramientas avanzadas para escalar tu negocio'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Pagos seguros',
      description: 'Procesamiento seguro con múltiples métodos de pago'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Alto rendimiento',
      description: 'Plataforma optimizada para velocidad y conversión'
    }
  ];

  const plans = [
    {
      name: 'Emprende',
      price: 29,
      description: 'Perfecto para empezar',
      features: ['Hasta 100 productos', 'Comisión 5%', 'Soporte básico'],
      popular: false
    },
    {
      name: 'Crece',
      price: 59,
      description: 'Para negocios en expansión',
      features: ['Hasta 500 productos', 'Comisión 3%', 'Analytics avanzados'],
      popular: true
    },
    {
      name: 'Pro',
      price: 99,
      description: 'Para vendedores profesionales',
      features: ['Productos ilimitados', 'Comisión 2%', 'API personalizada'],
      popular: false
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Tu plataforma para 
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> crecer</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Democratizamos el acceso al comercio digital para MiPyMES en Colombia. 
                Construye tu negocio online con nuestra plataforma integral, segura y escalable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                  Empieza ahora — Crea tu tienda
                </Button>
                <Button variant="outline" size="lg">
                  Explorar marketplace
                </Button>
              </div>
            </div>
            <div className="lg:pl-8">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="E-commerce illustration"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="¿Qué estás buscando hoy?"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button
                  variant="primary"
                  className="absolute right-1 top-1 bottom-1 px-4"
                >
                  Buscar
                </Button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge>Electrónicos</Badge>
              <Badge>Moda</Badge>
              <Badge>Hogar</Badge>
              <Badge>Deportes</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Productos destacados
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Descubre los productos más populares seleccionados por nuestra comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              Ver todos los productos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits for Sellers */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ¿Por qué vender con nosotros?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Las herramientas y el soporte que necesitas para hacer crecer tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Planes diseñados para cada etapa
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Desde emprendedores hasta grandes volúmenes, tenemos el plan perfecto para ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`text-center relative ${plan.popular ? 'ring-2 ring-indigo-500' : ''}`}>
                {plan.popular && (
                  <Badge variant="premium" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Más popular
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/mes</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-600 dark:text-gray-300 text-sm">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  Seleccionar plan
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              Comparar todos los planes
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Casos de éxito
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Miles de vendedores ya confían en nuestra plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'María García',
                store: 'Moda Urbana',
                testimonial: 'En 6 meses pasé de 0 a $10,000 mensuales. La plataforma es increíble.',
                rating: 5,
                sales: '$50K+ vendidos'
              },
              {
                name: 'Carlos Ruiz',
                store: 'ElectroTech',
                testimonial: 'Las herramientas de marketing me ayudaron a triplicar mis ventas.',
                rating: 5,
                sales: '$25K+ vendidos'
              },
              {
                name: 'Ana López',
                store: 'Casa & Jardín',
                testimonial: 'Excelente soporte y comisiones justas. Lo recomiendo 100%.',
                rating: 5,
                sales: '$75K+ vendidos'
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.store}
                    </p>
                  </div>
                  <Badge variant="success" size="sm">
                    {testimonial.sales}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para vender?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Únete a miles de vendedores exitosos. Configura tu tienda hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-50"
            >
              Crear mi tienda gratis
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Ver demo en vivo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;