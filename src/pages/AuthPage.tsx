import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export function AuthPage() {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'buyer' as 'buyer' | 'vendor',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'Contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Contraseña debe tener al menos 6 caracteres';
    }

    if (!isLogin) {
      if (!formData.full_name) {
        newErrors.full_name = 'Nombre completo es requerido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        // Redirigir según el rol del usuario
        if (formData.role === 'vendor') {
          navigate('/vendor-onboarding');
        } else {
          navigate('/');
        }
      } else {
        await signUp(formData.email, formData.password, {
          full_name: formData.full_name,
          role: formData.role,
          phone: formData.phone || undefined,
        });
        // Redirigir según el rol del usuario
        if (formData.role === 'vendor') {
          navigate('/vendor-onboarding');
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setErrors({ submit: error.message || 'Error en la autenticación' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({
                  email: '',
                  password: '',
                  full_name: '',
                  phone: '',
                  role: 'buyer',
                });
              }}
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
              </div>
            )}

            {!isLogin && (
              <>
                <Input
                  label="Nombre completo"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  error={errors.full_name}
                  icon={<User className="h-5 w-5" />}
                  placeholder="Tu nombre completo"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de cuenta
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="relative">
                      <input
                        type="radio"
                        name="role"
                        value="buyer"
                        checked={formData.role === 'buyer'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.role === 'buyer'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}>
                        <User className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                        <p className="text-sm font-medium text-center">Comprador</p>
                      </div>
                    </label>
                    <label className="relative">
                      <input
                        type="radio"
                        name="role"
                        value="vendor"
                        checked={formData.role === 'vendor'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.role === 'vendor'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}>
                        <Store className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                        <p className="text-sm font-medium text-center">Vendedor</p>
                      </div>
                    </label>
                  </div>
                </div>

                <Input
                  label="Teléfono (opcional)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  icon={<Phone className="h-5 w-5" />}
                  placeholder="+57 300 123 4567"
                />
              </>
            )}

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              icon={<Mail className="h-5 w-5" />}
              placeholder="tu@email.com"
              required
            />

            <div className="relative">
              <Input
                label="Contraseña"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                icon={<Lock className="h-5 w-5" />}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                </div>
              ) : (
                isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </Button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </Card>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          Al continuar, aceptas nuestros{' '}
          <a href="#" className="text-primary-600 hover:text-primary-500">
            Términos de Servicio
          </a>{' '}
          y{' '}
          <a href="#" className="text-primary-600 hover:text-primary-500">
            Política de Privacidad
          </a>
        </div>
      </div>
    </div>
  );
}