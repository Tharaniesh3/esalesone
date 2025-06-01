'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface OrderItem {
  product: {
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  selectedVariant?: {
    color?: string;
    size?: string;
  };
}

interface Order {
  orderNumber: string;
  items: OrderItem[];
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  total: number;
  status: string;
  createdAt: string;
}

function OrderDetails() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) {
        setError('No order number provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Error</h1>
        <p className="text-gray-600 mb-8">{error || 'Order not found'}</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Order Details */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Order Number
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {order.orderNumber}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Order Status
              </h3>
              <p className="text-lg font-semibold text-green-600">
                {order.status}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Order Date
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Shipping Address
              </h3>
              <p className="text-gray-900">
                {order.customerInfo.fullName}
                <br />
                {order.customerInfo.address}
                <br />
                {order.customerInfo.city}, {order.customerInfo.state}{' '}
                {order.customerInfo.zipCode}
                <br />
                {order.customerInfo.country}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-900">
                Email: {order.customerInfo.email}
                <br />
                Phone: {order.customerInfo.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.product.name}
                  </h3>
                  {item.selectedVariant && (
                    <p className="text-sm text-gray-600">
                      {item.selectedVariant.color && `Color: ${item.selectedVariant.color}`}
                      {item.selectedVariant.size && ` Size: ${item.selectedVariant.size}`}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600">
            Your order has been placed successfully. We'll send you an email with
            your order details and tracking information.
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        }>
          <OrderDetails />
        </Suspense>
      </div>
    </div>
  );
} 