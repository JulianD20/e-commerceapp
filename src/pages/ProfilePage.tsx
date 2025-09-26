import React, { useState } from 'react';
import { User, Package, MapPin, CreditCard, Heart, Bell, Shield, ChevronRight, Save, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, updateProfile, loading } = useAuth();
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        full_name: profileData.full_name,
        phone: profileData.phone
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const menuItems = [
    { id: 'orders', label: 'Mis pedidos', icon: <Package className="h-5 w-5" />, count: 12 },
    { id: 'addresses', label: 'Direcciones', icon: <MapPin className="h-5 w-5" /> },
    { id: 'payment', label: 'Métodos de pago', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'wishlist', label: 'Lista de deseos', icon: <Heart className="h-5 w-5" />, count: 8 },
    { id: 'notifications', label: 'Notificaciones', icon: <Bell className="h-5 w-5" /> },
    { id: 'security', label: 'Seguridad', icon: <Shield className="h-5 w-5" /> },
    { id: 'profile', label: 'Información personal', icon: <User className="h-5 w-5" /> }
  ];

  const orders = [
    {
      id: '#MH-001234',
      date: '2025-01-15',
      total: 89.99,
      status: 'delivered',
      items: 2,
      tracking: 'TRK123456789'
    },
    {
      id: '#MH-001233',
      date: '2025-01-10',
      total: 156.50,
      status: 'shipped',
      items: 1,
      tracking: 'TRK123456788'
    },
    {
      id: '#MH-001232',
      date: '2025-01-05',
      total: 67.25,
      status: 'processing',
      items: 3,
      tracking: null
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Mi cuenta
      </h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <Card padding="sm">
            {/* User Info */}
            <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                {user?.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt="Avatar" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {user?.full_name || 'Usuario'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
              {user?.role === 'vendor' && (
                <Badge variant="premium" size="sm" className="mt-2">
                  Vendedor
                </Badge>
              )}
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <Badge variant="default" size="sm">{item.count}</Badge>
                    )}
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Mis pedidos
                </h2>
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <option>Últimos 3 meses</option>
                  <option>Este año</option>
                  <option>Todos los pedidos</option>
                </select>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            Pedido {order.id}
                          </h3>
                          <Badge
                            variant={
                              order.status === 'delivered' ? 'success' :
                              order.status === 'shipped' ? 'info' :
                              order.status === 'processing' ? 'warning' : 'default'
                            }
                            size="sm"
                          >
                            {order.status === 'delivered' && 'Entregado'}
                            {order.status === 'shipped' && 'Enviado'}
                            {order.status === 'processing' && 'Procesando'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Fecha</p>
                            <p className="text-gray-900 dark:text-gray-100">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Total</p>
                            <p className="text-gray-900 dark:text-gray-100">${order.total}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Artículos</p>
                            <p className="text-gray-900 dark:text-gray-100">{order.items}</p>
                          </div>
                          {order.tracking && (
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Seguimiento</p>
                              <p className="text-gray-900 dark:text-gray-100 font-mono text-xs">
                                {order.tracking}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Ver detalles
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="ghost" size="sm">
                            Recomprar
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Información personal
                </h2>
                <Button
                  variant={isEditing ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancelar' : 'Editar'}
                </Button>
              </div>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Datos básicos
                </h3>
                
                <div className="space-y-4">
                  <Input
                    label="Nombre completo"
                    placeholder="Juan Pérez"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    disabled
                    helper="El email no se puede cambiar"
                  />
                  
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />

                  {isEditing && (
                    <div className="pt-4 flex gap-3">
                      <Button 
                        variant="primary" 
                        onClick={handleSaveProfile}
                        loading={loading}
                        icon={<Save className="h-4 w-4" />}
                      >
                        Guardar cambios
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setProfileData({
                            full_name: user?.full_name || '',
                            phone: user?.phone || '',
                            email: user?.email || ''
                          });
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Mis direcciones
                </h2>
                <Button variant="primary" size="sm">
                  Agregar dirección
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="success" size="sm">Principal</Badge>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Casa</p>
                    <p className="text-gray-600 dark:text-gray-300">Calle 123 #45-67</p>
                    <p className="text-gray-600 dark:text-gray-300">Bogotá, Colombia</p>
                    <p className="text-gray-600 dark:text-gray-300">110111</p>
                  </div>
                </Card>

                <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center min-h-[120px]">
                  <Button variant="ghost" className="text-center">
                    <Plus className="h-8 w-8 mx-auto mb-2" />
                    <span>Agregar nueva dirección</span>
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;