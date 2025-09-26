import React from 'react';
import { Users, Target, Eye, Award, MapPin, Phone, Mail } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Democratización Digital',
      description: 'Hacemos accesible el comercio electrónico para todas las MiPyMES colombianas'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Innovación Constante',
      description: 'Desarrollamos soluciones tecnológicas de vanguardia adaptadas al mercado local'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Acompañamiento Personalizado',
      description: 'Brindamos soporte integral para el crecimiento de cada negocio'
    }
  ];

  const team = [
    {
      name: 'Equipo de Desarrollo',
      role: 'Tecnología e Innovación',
      description: 'Especialistas en crear soluciones escalables y seguras'
    },
    {
      name: 'Equipo Comercial',
      role: 'Atención al Cliente',
      description: 'Dedicados al éxito de nuestros vendedores'
    },
    {
      name: 'Equipo de Marketing',
      role: 'Crecimiento Digital',
      description: 'Expertos en posicionamiento y marketing digital'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Quiénes Somos
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            En <strong className="text-indigo-600 dark:text-indigo-400">CachMarket</strong> somos una empresa de tecnología especializada en el desarrollo de soluciones de comercio electrónico para micro, pequeñas y medianas empresas (MiPyMES) en Colombia.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Nuestra Misión
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Brindar a las MiPyMES una solución integral de comercio electrónico a través de CachMarket, una plataforma accesible, segura y adaptable, que permita a los emprendedores y empresarios colombianos optimizar sus procesos de venta, ampliar su alcance en el mercado digital y fortalecer su competitividad en la economía actual.
            </p>
            <Button variant="primary" size="lg">
              Conoce nuestros planes
            </Button>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Misión CachMarket"
              className="w-full h-80 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Nuestra Visión
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              En el año 2030, CachMarket será reconocida como una de las principales plataformas de comercio electrónico en Colombia y América Latina, líder en innovación digital y apoyo a las MiPyMES, generando impacto económico y social mediante la transformación digital de los negocios locales y regionales.
            </p>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Colombia y América Latina</span>
            </div>
          </div>
          <div className="lg:order-1 relative">
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Visión CachMarket"
              className="w-full h-80 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Purpose Section */}
      <div className="mb-16 text-center">
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Nuestro Propósito
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Democratizar el acceso al comercio digital mediante una plataforma multitienda, segura y escalable, que integra pasarelas de pago, logística y herramientas de marketing digital. Buscamos ser el aliado estratégico de los negocios que desean modernizarse y competir en el entorno digital, ofreciendo planes flexibles y acompañamiento personalizado.
          </p>
        </Card>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
          Nuestros Valores
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
          Nuestro Equipo
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index}>
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
                {member.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 text-center mb-3 font-medium">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {member.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Únete a CachMarket y lleva tu MiPyME al siguiente nivel digital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-50"
            >
              Crear mi tienda
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Contactar asesor
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-indigo-100">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+57 (1) 234-5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@cachmarket.com</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;