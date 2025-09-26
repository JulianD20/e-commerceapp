import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });

  const steps = [
    { id: 1, name: 'Información', icon: <Truck className="h-5 w-5" /> },
    { id: 2, name: 'Envío', icon: <Truck className="h-5 w-5" /> },
    { id: 3, name: 'Pago', icon: <CreditCard className="h-5 w-5" /> },
    { id: 4, name: 'Confirmación', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const shippingOptions = [
    { id: 'standard', name: 'Envío estándar', price: 9.99, time: '5-7 días laborales' },
    { id: 'express', name: 'Envío express', price: 19.99, time: '2-3 días laborales' },
    { id: 'overnight', name: 'Envío nocturno', price: 39.99, time: '1 día laboral' }
  ];

  const selectedShipping = shippingOptions.find(option => option.id === formData.shippingMethod);
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + (selectedShipping?.price || 0) + tax;

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Finalizar compra
        </h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-md mx-auto lg:mx-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  currentStep >= step.id
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  currentStep >= step.id ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.name}
                </span>
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Información de contacto
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre"
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                  <Input
                    label="Apellido"
                    placeholder="Pérez"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
                
                <Input
                  label="Teléfono"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                
                <Input
                  label="Dirección"
                  placeholder="Calle 123 #45-67"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Ciudad"
                    placeholder="Bogotá"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  <Input
                    label="Código postal"
                    placeholder="110111"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Shipping Method */}
          {currentStep === 2 && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Método de envío
              </h2>
              
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.shippingMethod === option.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={formData.shippingMethod === option.id}
                        onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {option.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.time}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      ${option.price}
                    </span>
                  </label>
                ))}
              </div>
            </Card>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Información de pago
              </h2>

              {/* Payment Methods */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', name: 'Tarjeta', icon: <CreditCard className="h-4 w-4" /> },
                    { id: 'paypal', name: 'PayPal', icon: <div className="text-blue-600 font-bold text-xs">PP</div> },
                    { id: 'pse', name: 'PSE', icon: <div className="text-green-600 font-bold text-xs">PSE</div> }
                  ].map((method) => (
                    <Button
                      key={method.id}
                      variant={formData.paymentMethod === method.id ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleInputChange('paymentMethod', method.id)}
                      icon={method.icon}
                    >
                      {method.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Card Form */}
              {formData.paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Nombre en la tarjeta"
                    placeholder="Juan Pérez"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                  />
                  
                  <Input
                    label="Número de tarjeta"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Vencimiento"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-600" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tu información está protegida con encriptación SSL de 256 bits
                </p>
              </div>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <Card className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                ¡Pedido confirmado!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Hemos enviado un email de confirmación con los detalles de tu pedido.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Número de pedido: #MH-2025-001234
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Fecha estimada de entrega: 12-18 Enero 2025
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="primary">
                  Seguir comprando
                </Button>
                <Button variant="outline">
                  Ver mi pedido
                </Button>
              </div>
            </Card>
          )}

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                Anterior
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
              >
                {currentStep === 3 ? 'Finalizar pedido' : 'Continuar'}
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Tu pedido
            </h3>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Cantidad: {item.quantity}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.variant}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Envío</span>
                <span>${selectedShipping?.price.toFixed(2) || '0.00'}</span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Impuestos</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700 pt-2">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Lock className="h-3 w-3" />
              <span>Pago seguro SSL</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;