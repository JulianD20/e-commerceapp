# CachMarket - Multi-Vendor E-commerce Platform

## Descripción
CachMarket es una plataforma de comercio electrónico especializada en brindar soluciones integrales para micro, pequeñas y medianas empresas (MiPyMES) en Colombia. Ofrecemos una plataforma multitienda, segura y escalable, que integra pasarelas de pago, logística y herramientas de marketing digital.

## Características principales

### 🏪 Multi-Vendor
- Marketplace con múltiples vendedores
- Dashboard completo para vendedores
- Gestión de productos y pedidos
- Sistema de comisiones por plan

### 💳 Planes de Suscripción
- **Emprende** ($29/mes): Hasta 100 productos, comisión 5%
- **Crece** ($59/mes): Hasta 500 productos, comisión 3%
- **Pro** ($99/mes): Productos ilimitados, comisión 2%
- **Elite** ($199/mes): Enterprise features, comisión 1.5%

### 🤖 Chatbot Inteligente
- Asistencia automatizada 24/7
- Escalamiento a soporte humano
- Intents principales: afiliación, planes, pedidos, soporte

### 🎨 Sistema de Diseño
- **Colores**: Azul/morado primario, dorado/mostaza para premium
- **Tipografías**: Inter (body), Poppins (headings)
- **Responsive**: Mobile-first, tablet (768px+), desktop (1024px+)
- **Accesibilidad**: WCAG AA, focus visible, ARIA labels

## Estructura de componentes

### Tokens de diseño
```css
/* Colores principales */
--primary-500: #6366f1;
--primary-600: #4f46e5;
--secondary-500: #a855f7;
--accent-500: #f59e0b;

/* Tipografías */
--font-heading: 'Poppins', sans-serif;
--font-body: 'Inter', sans-serif;

/* Espaciado (sistema 8px) */
--space-1: 4px;
--space-2: 8px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;

/* Breakpoints */
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
```

### Componentes UI
- **Button**: Primary, Secondary, Ghost, Outline variants
- **Input**: Con validación, iconos, estados de error
- **Card**: Padding configurable, hover effects
- **Badge**: Success, Warning, Error, Premium variants
- **Modal**: Tamaños configurables, overlay
- **Toast**: Notificaciones con auto-dismiss

### Páginas principales
1. **HomePage**: Hero, búsqueda, productos destacados, planes
2. **MarketplacePage**: Catálogo con filtros, búsqueda, paginación
3. **ProductDetailPage**: Galería, variantes, reseñas, vendedor
4. **CartPage**: Items, promociones, resumen
5. **CheckoutPage**: Multi-step (info, envío, pago, confirmación)
6. **PlansPage**: Comparación detallada, upgrade flows
7. **VendorDashboard**: Analytics, productos, pedidos, plan
8. **AuthPage**: Login/registro con OAuth

## Funcionalidades técnicas

### Contextos React
- **ThemeContext**: Manejo de tema claro/oscuro
- **AuthContext**: Autenticación y gestión de usuarios
- **CartContext**: Estado del carrito de compras
- **ChatbotContext**: Mensajes y lógica del chatbot

### Accesibilidad
- Contraste WCAG AA mínimo
- Focus visible en todos los elementos interactivos
- Labels ARIA en componentes complejos
- Soporte para lectores de pantalla
- Navegación por teclado

### Performance
- Lazy loading para imágenes
- Skeleton loaders
- Optimización de bundle
- Imágenes responsive con srcset

### SEO
- Meta tags por página
- Open Graph tags
- URLs semánticas
- Structured data

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## Estructura de archivos

```
src/
├── components/
│   ├── ui/              # Componentes base del design system
│   ├── layout/          # Layout components (Navbar, Footer)
│   ├── product/         # Componentes relacionados con productos
│   └── chatbot/         # Componentes del chatbot
├── contexts/            # React contexts
├── pages/               # Páginas principales
├── design-system/       # Tokens y especificaciones
└── utils/               # Utilidades
```

## Próximos pasos

### MVP Priorizado
1. ✅ Home + Marketplace + Product Detail
2. ✅ Cart + Checkout básico
3. ✅ Auth (login/register)
4. ✅ Vendor onboarding y dashboard
5. ✅ Planes y upgrade flows
6. ✅ Chatbot con intents principales

### Siguientes iteraciones
- Admin dashboard completo
- Sistema de reseñas avanzado
- Integraciones de pago reales
- Analytics y reportes
- Notificaciones push
- API REST completa
- Tests automatizados

## Especificaciones para desarrolladores

### Endpoints sugeridos
```
GET /api/products?category=&price_min=&price_max=&page=
GET /api/products/{id}
POST /api/cart
POST /api/checkout
GET /api/vendors/{id}
POST /api/auth/login
POST /api/auth/register
GET /api/orders
POST /api/products (vendor)
```

### Eventos de analytics
- `product_view`
- `add_to_cart`
- `checkout_initiated`
- `order_completed`
- `seller_signup`
- `plan_upgrade`

### Integraciones recomendadas
- **Pagos**: Stripe, PayPal, PSE (Colombia)
- **Analytics**: Google Analytics 4
- **Errores**: Sentry
- **Email**: SendGrid, Mailgun
- **Storage**: AWS S3, Cloudinary
- **Search**: Algolia, Elasticsearch