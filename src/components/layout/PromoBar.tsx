import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

const PromoBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 relative">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-sm font-medium">
          🎉 ¡Lanzamiento especial! Plan Emprende desde $29/mes
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 text-white hover:bg-white/20"
        >
          Ver planes
        </Button>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PromoBar;