import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerInfo, total, cardNumber } = body;

    // Connect to database
    await connectToDatabase();

    // Validate products and check inventory
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.product}` },
          { status: 404 }
        );
      }

      // Check if product has enough inventory
      if (product.inventory < item.quantity) {
        return NextResponse.json(
          { error: `Not enough inventory for ${product.name}` },
          { status: 400 }
        );
      }

      // Update inventory
      product.inventory -= item.quantity;
      await product.save();
    }

    // Simulate payment processing
    const paymentResult = simulatePayment(cardNumber);
    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.error },
        { status: 400 }
      );
    }

    // Create order
    const order = new Order({
      items,
      customerInfo,
      total,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      paymentDetails: {
        last4: cardNumber.slice(-4),
      },
    });

    await order.save();

    // Send confirmation email
    await sendOrderConfirmationEmail({
      to: customerInfo.email,
      orderNumber: order.orderNumber,
      customerName: customerInfo.fullName,
      items,
      total,
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Order number is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const order = await Order.findOne({ orderNumber });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// Simulate payment processing
function simulatePayment(cardNumber: string) {
  // Simulate random payment failures
  const random = Math.random();
  if (random < 0.1) {
    return {
      success: false,
      error: 'Payment declined by bank',
    };
  }
  if (random < 0.2) {
    return {
      success: false,
      error: 'Payment gateway error',
    };
  }
  return { success: true };
} 