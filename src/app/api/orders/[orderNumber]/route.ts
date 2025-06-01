import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

export async function GET(
  req: Request,
  { params }: { params: { orderNumber: string } }
) {
  try {
    await connectDB();
    const order = await Order.findOne({ orderNumber: params.orderNumber }).populate('product');
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
} 