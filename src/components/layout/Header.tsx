'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">eSalesOne</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/categories/men" className="text-gray-600 hover:text-gray-900">
              Men
            </Link>
            <Link href="/categories/women" className="text-gray-600 hover:text-gray-900">
              Women
            </Link>
            <Link href="/categories/kids" className="text-gray-600 hover:text-gray-900">
              Kids
            </Link>
            <Link href="/categories/home" className="text-gray-600 hover:text-gray-900">
              Home & Living
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="text-gray-600 hover:text-gray-900">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/categories/men" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Men
              </Link>
              <Link href="/categories/women" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Women
              </Link>
              <Link href="/categories/kids" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Kids
              </Link>
              <Link href="/categories/home" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Home & Living
              </Link>
            </div>
            <div className="px-4 py-3">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 