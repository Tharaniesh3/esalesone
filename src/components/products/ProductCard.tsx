import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  isNew?: boolean;
  variants?: {
    name: string;
    options: string[];
  }[];
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  discount,
  isNew = false,
  variants,
}: ProductCardProps) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<{
    color?: string;
    size?: string;
  }>({});
  const { addToCart } = useCart();

  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: discountedPrice,
      image,
      quantity: 1,
      selectedVariant,
    });
  };

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Quick Actions */}
        <div
          className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => setIsWishlist(!isWishlist)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {isWishlist ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
              New
            </span>
          )}
          {discount && (
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2 capitalize">{category}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount && (
            <span className="text-sm text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quick Add to Cart */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white p-4 border-t transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 