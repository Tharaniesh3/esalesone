import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        selectedVariant: {
          color: String,
          size: String,
        },
      },
    ],
    customerInfo: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal'],
      required: true,
    },
    paymentDetails: {
      last4: String,
      transactionId: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ 'customerInfo.email': 1 });
orderSchema.index({ createdAt: -1 });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema); 