'use client';
import { useState } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Filter {
  id: string;
  name: string;
  options: string[];
}

const filters: Filter[] = [
  {
    id: 'category',
    name: 'Category',
    options: ['T-Shirts', 'Shirts', 'Pants', 'Dresses', 'Shoes'],
  },
  {
    id: 'size',
    name: 'Size',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'color',
    name: 'Color',
    options: ['Black', 'White', 'Blue', 'Red', 'Green'],
  },
  {
    id: 'price',
    name: 'Price Range',
    options: ['Under $25', '$25 - $50', '$50 - $100', 'Over $100'],
  },
];

// Mock products data
const products = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: '/images/products/tshirt.jpg',
    category: 'men',
    isNew: true,
  },
  {
    id: '2',
    name: 'Summer Dress',
    price: 49.99,
    image: '/images/products/dress.jpg',
    category: 'women',
    discount: 20,
  },
  {
    id: '3',
    name: 'Kids Sneakers',
    price: 39.99,
    image: '/images/products/sneakers.jpg',
    category: 'kids',
  },
  {
    id: '4',
    name: 'Home Decor Set',
    price: 79.99,
    image: '/images/products/decor.jpg',
    category: 'home',
  },
  // Add more products as needed
];

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterId]: newValues };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold capitalize">{params.category}</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm"
          >
            <FunnelIcon className="h-5 w-5" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`fixed inset-0 z-50 bg-white p-6 transform transition-transform duration-300 md:relative md:transform-none md:w-64 ${
              isFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <h3 className="font-semibold mb-3">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters[filter.id]?.includes(option)}
                          onChange={() => handleFilterChange(filter.id, option)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 