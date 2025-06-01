'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from '@/components/products/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const mockProduct = {
  name: 'Converse Chuck Taylor All Star II Hi',
  description: 'The Chuck Taylor All Star II Hi is a modern take on the classic Chuck Taylor design. It features improved comfort and durability while maintaining the iconic style.',
  price: 89.99,
  image: '/converse.jpg',
  variants: [
    {
      name: 'Color',
      options: ['Black', 'White', 'Navy'],
    },
    {
      name: 'Size',
      options: ['7', '8', '9', '10', '11'],
    },
  ],
};

const featuredCategories = [
  {
    id: 1,
    name: "Men",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    link: "/categories/men",
  },
  {
    id: 2,
    name: "Women",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    link: "/categories/women",
  },
  {
    id: 3,
    name: "Kids",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    link: "/categories/kids",
  },
  {
    id: 4,
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    link: "/categories/home",
  },
];

const trendingProducts = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    category: "men",
  },
  {
    id: 2,
    name: "Summer Dress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    category: "women",
  },
  {
    id: 3,
    name: "Kids Sneakers",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    category: "kids",
  },
  {
    id: 4,
    name: "Home Decor Set",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "home",
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState({
    color: mockProduct.variants[0].options[0],
    size: mockProduct.variants[1].options[0],
  });
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const orderData = {
      product: mockProduct,
      selectedVariant,
      quantity,
      total: mockProduct.price * quantity,
    };
    
    localStorage.setItem('orderData', JSON.stringify(orderData));
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
            alt="Hero"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Discover the Latest Trends</h1>
          <p className="text-xl mb-8 drop-shadow-lg">Shop the newest arrivals in fashion and lifestyle</p>
          <Link
            href="/categories/new-arrivals"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={category.link}
                className="group relative h-64 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold drop-shadow-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id.toString()}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-xl mb-8">Subscribe to get special offers, free giveaways, and updates</p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
} 