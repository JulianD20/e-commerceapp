import React from 'react';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [promoCode, setPromoCode] = React.useState('');
  const [promoApplied, setPromoApplied] = React.useState(false);
  
  const shipping = 9.99;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shipping + tax - (promoApplied ? 20 : 0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME20') {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Descubre productos increíbles en nuestro marketplace
          </p>
          <Button variant="primary" size="lg">
            Explorar productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Carrito de compras ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${item.variant || ''}`} padding="sm">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1 truncate">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Vendido por {item.vendorName}
                  </p>
                  
                  {item.variant && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {item.variant}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        icon={<Minus className="h-3 w-3" />}
                      />
                      <span className="w-8 text-center text-gray-900 dark:text-gray-100 font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        icon={<Plus className="h-3 w-3" />}
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => removeItem(item.id)}
                        icon={<Trash2 className="h-3 w-3" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Recommended Products */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              También te puede interesar
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Simplified product suggestions */}
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} padding="sm" hover>
                  <img
                    src={`https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=200`}
                    alt="Product suggestion"
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Producto relacionado {i}
                  </h4>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    $49.99
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Resumen del pedido
            </h3>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Código promocional"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                >
                  Aplicar
                </Button>
              </div>
              {promoApplied && (
                <Badge variant="success" className="mt-2">
                  Código WELCOME20 aplicado
                </Badge>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal ({totalItems} artículos)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Envío</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Impuestos</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Descuento</span>
                  <span>-$20.00</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Envío gratis</strong> en pedidos mayores a $50
              </p>
              {totalPrice < 50 && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Añade ${(50 - totalPrice).toFixed(2)} más para envío gratis
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="primary" size="lg" className="w-full">
                Proceder al pago
              </Button>
              <Button variant="outline" size="md" className="w-full">
                Seguir comprando
              </Button>
            </div>

            {/* Security */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                🔒 Pago seguro con encriptación SSL
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;