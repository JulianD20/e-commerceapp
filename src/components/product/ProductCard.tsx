import React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  vendorName: string;
  vendorId: string;
  badges?: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      vendorId: product.vendorId,
      vendorName: product.vendorName
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Open quick view modal
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercentage = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <Card
      padding="none"
      hover
      className="group cursor-pointer overflow-hidden"
    >
      <a href={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badges?.map((badge, index) => (
              <Badge key={index} variant="premium" size="sm">
                {badge}
              </Badge>
            ))}
            {discountPercentage > 0 && (
              <Badge variant="error" size="sm">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
            icon={<Heart className="h-4 w-4" />}
          >
            <span className="sr-only">Agregar a favoritos</span>
          </Button>

          {/* Quick Actions - Show on hover */}
          <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              icon={<ShoppingCart className="h-4 w-4" />}
            >
              {product.inStock ? 'Añadir' : 'Agotado'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickView}
              icon={<Eye className="h-4 w-4" />}
            >
              <span className="sr-only">Vista rápida</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          {/* Vendor */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            <a href={`/store/${product.vendorId}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {product.vendorName}
            </a>
          </p>

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {savings > 0 && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Ahorras ${savings.toFixed(2)}
            </p>
          )}
        </div>
      </a>
    </Card>
  );
};

export default ProductCard;