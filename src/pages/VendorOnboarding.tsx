import React, { useState } from 'react';
import { Store, Upload, MapPin, Phone, Mail, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { supabase } from '../lib/supabase';

const VendorOnboarding: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    store_name: '',
    store_description: '',
    store_logo: '',
    store_banner: '',
    location: '',
    plan_id: 'emprende',
    phone: profile?.phone || '',
    email: profile?.email || ''
  });

  const steps = [
    { id: 1, title: 'Información básica', description: 'Datos de tu tienda' },
    { id: 2, title: 'Personalización', description: 'Logo y banner' },
    { id: 3, title: 'Plan de suscripción', description: 'Elige tu plan' },
    { id: 4, title: '¡Listo!', description: 'Tu tienda está configurada' }
  ];

  const plans = [
    {
      id: 'emprende',
      name: 'Emprende',
      price: 29,
      description: 'Perfecto para empezar',
      features: ['Hasta 100 productos', 'Comisión 5%', 'Soporte básico'],
      recommended: true
    },
    {
      id: 'crece',
      name: 'Crece',
      price: 59,
      description: 'Para negocios en expansión',
      features: ['Hasta 500 productos', 'Comisión 3%', 'Analytics avanzados'],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 99,
      description: 'Para vendedores profesionales',
      features: ['Productos ilimitados', 'Comisión 2%', 'API personalizada']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Crear perfil de vendedor
      const { error } = await supabase
        .from('vendor_profiles')
        .insert({
          user_id: user.id,
          store_name: formData.store_name,
          store_description: formData.store_description,
          store_logo: formData.store_logo,
          store_banner: formData.store_banner,
          location: formData.location,
          plan_id: formData.plan_id,
          subscription_status: 'active'
        });

      if (error) throw error;

      // Redirigir al dashboard del vendedor
      navigate('/vendor-dashboard');
    } catch (error: any) {
      console.error('Error creating vendor profile:', error);
      alert('Error al crear tu tienda. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            ¡Bienvenido a CachMarket!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Configuremos tu tienda en unos simples pasos
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.id
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          {/* Step 1: Información básica */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Información básica de tu tienda
              </h2>
              
              <div className="space-y-6">
                <Input
                  label="Nombre de tu tienda"
                  placeholder="Ej: TechStore Pro"
                  value={formData.store_name}
                  onChange={(e) => handleInputChange('store_name', e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción de tu tienda
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe tu tienda y los productos que vendes..."
                    value={formData.store_description}
                    onChange={(e) => handleInputChange('store_description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Ubicación"
                    placeholder="Ciudad, País"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    icon={<MapPin className="h-5 w-5" />}
                  />
                  <Input
                    label="Teléfono de contacto"
                    placeholder="+57 300 123 4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    icon={<Phone className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personalización */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Personaliza tu tienda
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo de tu tienda
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Arrastra tu logo aquí o haz clic para seleccionar
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG hasta 2MB (recomendado: 200x200px)
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Seleccionar archivo
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Banner de tu tienda
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Arrastra tu banner aquí o haz clic para seleccionar
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG hasta 5MB (recomendado: 1200x400px)
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Seleccionar archivo
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 <strong>Consejo:</strong> Puedes omitir este paso y agregar imágenes más tarde desde tu dashboard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Plan de suscripción */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Elige tu plan de suscripción
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      formData.plan_id === plan.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleInputChange('plan_id', plan.id)}
                  >
                    {plan.popular && (
                      <Badge variant="premium" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        Más popular
                      </Badge>
                    )}
                    {plan.recommended && (
                      <Badge variant="info" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        Recomendado
                      </Badge>
                    )}

                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {plan.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                          ${plan.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">/mes</span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={formData.plan_id === plan.id}
                      onChange={(e) => handleInputChange('plan_id', e.target.value)}
                      className="sr-only"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Nota:</strong> Puedes cambiar tu plan en cualquier momento desde tu dashboard. 
                  Los primeros 14 días son gratuitos para que pruebes la plataforma.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirmación */}
          {currentStep === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                ¡Tu tienda está lista!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Hemos configurado tu tienda <strong>{formData.store_name}</strong> con el plan <strong>{plans.find(p => p.id === formData.plan_id)?.name}</strong>. 
                Ahora puedes empezar a agregar productos y gestionar tu negocio.
              </p>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Próximos pasos:
                </h3>
                <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>✅ Agregar tus primeros productos</li>
                  <li>✅ Configurar métodos de pago</li>
                  <li>✅ Personalizar tu tienda</li>
                  <li>✅ Explorar herramientas de marketing</li>
                </ul>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Anterior
          </Button>

          {currentStep < 4 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === 1 && !formData.store_name}
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Continuar
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleFinish}
              loading={loading}
              size="lg"
            >
              Ir a mi dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;