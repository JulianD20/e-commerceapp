import React, { useState } from 'react';
import { Check, Crown, Zap, TrendingUp, Users, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const PlansPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plans = [
    {
      id: 'emprende',
      name: 'Emprende',
      icon: <Zap className="h-8 w-8" />,
      description: 'Perfecto para empezar tu negocio online',
      price: { monthly: 29, yearly: 290 },
      features: [
        'Hasta 100 productos',
        'Comisión 5% por venta',
        'Panel de control básico',
        'Soporte por email',
        'Plantillas de tienda',
        'Procesamiento de pagos',
        'SSL gratuito',
        'Subdomain personalizado'
      ],
      limitations: [
        'Sin analytics avanzados',
        'Sin API access',
        'Máximo 5 categorías'
      ],
      popular: false,
      recommended: true
    },
    {
      id: 'crece',
      name: 'Crece',
      icon: <TrendingUp className="h-8 w-8" />,
      description: 'Para negocios en expansión',
      price: { monthly: 59, yearly: 590 },
      features: [
        'Hasta 500 productos',
        'Comisión 3% por venta',
        'Analytics avanzados',
        'Soporte prioritario',
        'Integración con redes sociales',
        'Email marketing básico',
        'Múltiples métodos de pago',
        'Dominio personalizado',
        'Cupones y descuentos',
        'Reportes de inventario'
      ],
      limitations: [
        'Sin API personalizada',
        'Máximo 10 empleados'
      ],
      popular: true,
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: <Users className="h-8 w-8" />,
      description: 'Para vendedores profesionales',
      price: { monthly: 99, yearly: 990 },
      features: [
        'Productos ilimitados',
        'Comisión 2% por venta',
        'API personalizada completa',
        'Soporte 24/7',
        'Multi-tienda',
        'Email marketing avanzado',
        'Integraciones ERP/CRM',
        'White-label options',
        'Automated dropshipping',
        'Advanced SEO tools',
        'Custom checkout',
        'Empleados ilimitados'
      ],
      limitations: [],
      popular: false,
      recommended: false
    },
    {
      id: 'elite',
      name: 'Elite',
      icon: <Crown className="h-8 w-8" />,
      description: 'Para alto volumen y enterprise',
      price: { monthly: 199, yearly: 1990 },
      features: [
        'Todo de Pro +',
        'Comisión 1.5% por venta',
        'Account manager dedicado',
        'SLA garantizado',
        'Infraestructura dedicada',
        'Custom integrations',
        'Priority marketplace placement',
        'Advanced analytics & BI',
        'Multi-country support',
        'Custom contract terms',
        'Onboarding personalizado'
      ],
      limitations: [],
      popular: false,
      recommended: false,
      enterprise: true
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowUpgradeModal(true);
  };

  const yearlyDiscount = 20; // 20% discount for yearly billing

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Planes de suscripción
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Elige el plan perfecto para tu negocio. Todas las opciones incluyen herramientas 
          profesionales para hacer crecer tu tienda online.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Anual
            <Badge variant="success" size="sm" className="ml-2">
              -{yearlyDiscount}%
            </Badge>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        {plans.map((plan, index) => (
          <Card
            key={plan.id}
            className={`relative text-center ${
              plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''
            } ${plan.enterprise ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : ''}`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <Badge variant="premium" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                Más popular
              </Badge>
            )}

            {/* Recommended Badge */}
            {plan.recommended && (
              <Badge variant="info" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                Recomendado
              </Badge>
            )}

            <div className="mb-6">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                plan.enterprise 
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              } text-white`}>
                {plan.icon}
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${
                plan.enterprise ? 'text-white' : 'text-gray-900 dark:text-gray-100'
              }`}>
                {plan.name}
              </h3>
              
              <p className={`text-sm ${
                plan.enterprise ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {plan.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`text-3xl font-bold ${
                  plan.enterprise ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                }`}>
                  ${billingCycle === 'monthly' ? plan.price.monthly : Math.round(plan.price.yearly / 12)}
                </span>
                <span className={`text-sm ${
                  plan.enterprise ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  /mes
                </span>
              </div>
              
              {billingCycle === 'yearly' && (
                <div className="space-y-1">
                  <p className={`text-sm line-through ${
                    plan.enterprise ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    ${plan.price.yearly} al año
                  </p>
                  <Badge variant="success" size="sm">
                    Ahorras ${Math.round(plan.price.yearly * 0.2)} al año
                  </Badge>
                </div>
              )}
            </div>

            {/* Features */}
            <ul className="text-left space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                    plan.enterprise ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <span className={`text-sm ${
                    plan.enterprise ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant={plan.popular || plan.enterprise ? 'primary' : 'outline'}
              size="lg"
              className={`w-full ${
                plan.enterprise 
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0'
                  : ''
              }`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.enterprise ? 'Contactar ventas' : 'Seleccionar plan'}
            </Button>

            {plan.enterprise && (
              <p className="text-xs text-gray-400 mt-2">
                Incluye onboarding personalizado
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Features Comparison Table */}
      <Card className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Comparación detallada de planes
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 font-semibold text-gray-900 dark:text-gray-100">
                  Características
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} className="text-center py-3 font-semibold text-gray-900 dark:text-gray-100">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Productos', values: ['100', '500', 'Ilimitados', 'Ilimitados'] },
                { feature: 'Comisión por venta', values: ['5%', '3%', '2%', '1.5%'] },
                { feature: 'Soporte', values: ['Email', 'Prioritario', '24/7', 'Dedicado'] },
                { feature: 'Analytics', values: ['Básico', 'Avanzado', 'Completo', 'Enterprise'] },
                { feature: 'API Access', values: ['❌', '❌', '✅', '✅'] },
                { feature: 'Multi-tienda', values: ['❌', '❌', '✅', '✅'] },
                { feature: 'White-label', values: ['❌', '❌', '✅', '✅'] }
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 font-medium text-gray-900 dark:text-gray-100">
                    {row.feature}
                  </td>
                  {row.values.map((value, valueIndex) => (
                    <td key={valueIndex} className="py-3 text-center text-gray-600 dark:text-gray-300">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAQ Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Preguntas frecuentes
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: '¿Puedo cambiar de plan en cualquier momento?',
              a: 'Sí, puedes actualizar o degradar tu plan cuando gustes. Los cambios se aplicarán en el próximo ciclo de facturación.'
            },
            {
              q: '¿Hay comisión adicional por transacciones?',
              a: 'Solo cobramos la comisión indicada en cada plan. No hay costos ocultos ni tarifas adicionales por transacción.'
            },
            {
              q: '¿Qué métodos de pago aceptan?',
              a: 'Aceptamos tarjetas de crédito/débito, PayPal, transferencias bancarias y pagos locales según tu región.'
            },
            {
              q: '¿Hay período de prueba gratuito?',
              a: 'Sí, todos los planes incluyen 14 días de prueba gratuita sin compromiso. No se requiere tarjeta de crédito.'
            }
          ].map((faq, index) => (
            <Card key={index}>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {faq.q}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          ¿Necesitas un plan personalizado?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Para empresas con necesidades específicas, ofrecemos soluciones a medida con 
          integrations personalizadas y soporte dedicado.
        </p>
        <Button variant="primary" size="lg">
          Contactar ventas
        </Button>
      </div>

      {/* Upgrade Modal */}
      <Modal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Confirmar suscripción"
        size="lg"
      >
        {selectedPlan && (
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Plan {plans.find(p => p.id === selectedPlan)?.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Ciclo de facturación: {billingCycle === 'monthly' ? 'Mensual' : 'Anual'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal</span>
                <span>${billingCycle === 'monthly' 
                  ? plans.find(p => p.id === selectedPlan)?.price.monthly 
                  : plans.find(p => p.id === selectedPlan)?.price.yearly
                }</span>
              </div>
              {billingCycle === 'yearly' && (
                <div className="flex justify-between items-center mb-2 text-green-600">
                  <span>Descuento anual (-{yearlyDiscount}%)</span>
                  <span>-${Math.round((plans.find(p => p.id === selectedPlan)?.price.yearly || 0) * 0.2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-lg border-t border-gray-200 dark:border-gray-600 pt-2">
                <span>Total</span>
                <span>${billingCycle === 'monthly' 
                  ? plans.find(p => p.id === selectedPlan)?.price.monthly 
                  : Math.round((plans.find(p => p.id === selectedPlan)?.price.yearly || 0) * 0.8)
                }</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowUpgradeModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" className="flex-1">
                Confirmar suscripción
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Al confirmar aceptas nuestros términos de servicio y política de privacidad. 
              La suscripción se renovará automáticamente.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PlansPage;