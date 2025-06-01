import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    variants: [
      {
        name: {
          type: String,
          required: true,
          enum: ['color', 'size'],
        },
        options: [String],
      },
    ],
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isNew: 1 });
productSchema.index({ rating: -1 });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema); 