import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Crown,
  Settings,
  HelpCircle,
  Bell,
  Store
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const { user } = useAuth();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: []
  });

  const stats = [
    { label: 'Ventas este mes', value: '$12,450', change: '+12%', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Órdenes totales', value: '234', change: '+8%', icon: <ShoppingCart className="h-5 w-5" /> },
    { label: 'Productos activos', value: '45', change: '+3', icon: <Package className="h-5 w-5" /> },
    { label: 'Visitantes únicos', value: '1,234', change: '+15%', icon: <Users className="h-5 w-5" /> }
  ];

  const recentOrders = [
    { id: '#MH-001', customer: 'Ana García', total: 89.99, status: 'pending', date: '2025-01-15' },
    { id: '#MH-002', customer: 'Carlos Ruiz', total: 156.50, status: 'shipped', date: '2025-01-15' },
    { id: '#MH-003', customer: 'María López', total: 67.25, status: 'delivered', date: '2025-01-14' },
    { id: '#MH-004', customer: 'Pedro Silva', total: 234.99, status: 'processing', date: '2025-01-14' }
  ];

  const products = [
    { id: '1', name: 'Smartphone XY', price: 699.99, stock: 15, status: 'active', sales: 45 },
    { id: '2', name: 'Auriculares HD', price: 159.99, stock: 8, status: 'active', sales: 23 },
    { id: '3', name: 'Cargador Inalámbrico', price: 29.99, stock: 0, status: 'inactive', sales: 12 },
    { id: '4', name: 'Funda Premium', price: 24.99, stock: 25, status: 'active', sales: 67 }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'products', label: 'Productos', icon: <Package className="h-5 w-5" /> },
    { id: 'orders', label: 'Pedidos', icon: <ShoppingCart className="h-5 w-5" /> },
    { id: 'customers', label: 'Clientes', icon: <Users className="h-5 w-5" /> },
    { id: 'plan', label: 'Mi Plan', icon: <Crown className="h-5 w-5" /> },
    { id: 'settings', label: 'Configuración', icon: <Settings className="h-5 w-5" /> },
    { id: 'help', label: 'Ayuda', icon: <HelpCircle className="h-5 w-5" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <Card padding="sm">
            <div className="mb-6 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {user?.vendor_profile?.store_name || 'Mi Tienda'}
                  </p>
                  <Badge variant="premium" size="sm">
                    Plan {user?.vendor_profile?.plan_id || 'Emprende'}
                  </Badge>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'orders' && (
                    <Badge variant="error" size="sm" className="ml-auto">3</Badge>
                  )}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Resumen de tu actividad comercial
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={<Bell className="h-4 w-4" />}>
                    Notificaciones
                  </Button>
                  <Badge variant="error" size="sm">2 nuevas</Badge>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                        {stat.icon}
                      </div>
                      <Badge variant="success" size="sm">{stat.change}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Recent Orders */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Órdenes recientes
                  </h3>
                  <Button variant="outline" size="sm">
                    Ver todas
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Pedido
                        </th>
                        <th className="text-left py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Cliente
                        </th>
                        <th className="text-left py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Total
                        </th>
                        <th className="text-left py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Estado
                        </th>
                        <th className="text-left py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 font-medium text-gray-900 dark:text-gray-100">
                            {order.id}
                          </td>
                          <td className="py-3 text-gray-600 dark:text-gray-300">
                            {order.customer}
                          </td>
                          <td className="py-3 text-gray-900 dark:text-gray-100">
                            ${order.total}
                          </td>
                          <td className="py-3">
                            <Badge
                              variant={
                                order.status === 'delivered' ? 'success' :
                                order.status === 'shipped' ? 'info' :
                                order.status === 'processing' ? 'warning' : 'default'
                              }
                              size="sm"
                            >
                              {order.status === 'pending' && 'Pendiente'}
                              {order.status === 'processing' && 'Procesando'}
                              {order.status === 'shipped' && 'Enviado'}
                              {order.status === 'delivered' && 'Entregado'}
                            </Badge>
                          </td>
                          <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Mis productos
                </h1>
                <Button
                  variant="primary"
                  onClick={() => setShowProductModal(true)}
                  icon={<Plus className="h-4 w-4" />}
                >
                  Nuevo producto
                </Button>
              </div>

              {/* Products List */}
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Producto
                        </th>
                        <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Precio
                        </th>
                        <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Stock
                        </th>
                        <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Ventas
                        </th>
                        <th className="text-left py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Estado
                        </th>
                        <th className="text-right py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-4">
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {product.name}
                            </div>
                          </td>
                          <td className="py-4 text-gray-900 dark:text-gray-100">
                            ${product.price}
                          </td>
                          <td className="py-4">
                            <Badge
                              variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                              size="sm"
                            >
                              {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                            </Badge>
                          </td>
                          <td className="py-4 text-gray-600 dark:text-gray-300">
                            {product.sales}
                          </td>
                          <td className="py-4">
                            <Badge
                              variant={product.status === 'active' ? 'success' : 'default'}
                              size="sm"
                            >
                              {product.status === 'active' ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Eye className="h-3 w-3" />}
                              >
                                <span className="sr-only">Ver</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Edit className="h-3 w-3" />}
                              >
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                icon={<Trash2 className="h-3 w-3" />}
                              >
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Plan Tab */}
          {activeTab === 'plan' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Mi plan de suscripción
              </h1>

              {/* Current Plan */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Plan Crece
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Siguiente facturación: 15 Febrero 2025
                    </p>
                  </div>
                  <Badge variant="premium">Activo</Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">45</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Productos de 500</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Comisión por venta</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$59</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Mensual</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="primary">Actualizar plan</Button>
                  <Button variant="outline">Ver historial</Button>
                </div>
              </Card>

              {/* Usage Stats */}
              <Card>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Uso del plan este mes
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Productos</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">45 / 500</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 rounded-full h-2"
                        style={{ width: '9%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Comisiones pagadas</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">$373.50</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* New Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title="Nuevo producto"
        size="lg"
      >
        <form className="space-y-4">
          <Input
            label="Nombre del producto"
            placeholder="Ej: Smartphone Galaxy Pro"
            value={newProduct.name}
            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Precio"
              type="number"
              placeholder="99.99"
              value={newProduct.price}
              onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
            />
            <Input
              label="Stock inicial"
              type="number"
              placeholder="10"
              value={newProduct.stock}
              onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoría
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newProduct.category}
              onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">Seleccionar categoría</option>
              <option value="electronics">Electrónicos</option>
              <option value="fashion">Moda</option>
              <option value="home">Hogar</option>
              <option value="sports">Deportes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              placeholder="Describe tu producto..."
              value={newProduct.description}
              onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowProductModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" className="flex-1">
              Crear producto
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VendorDashboard;