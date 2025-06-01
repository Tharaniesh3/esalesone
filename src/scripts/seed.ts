import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';

const products = [
  {
    name: 'Classic White T-Shirt',
    description: 'A comfortable and versatile white t-shirt made from 100% cotton.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    category: 'men',
    inventory: 100,
    variants: [
      {
        name: 'size',
        options: ['S', 'M', 'L', 'XL'],
      },
      {
        name: 'color',
        options: ['White', 'Black', 'Navy'],
      },
    ],
    isNew: true,
    rating: 4.5,
  },
  {
    name: 'Summer Dress',
    description: 'A beautiful floral summer dress perfect for warm days.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=962&q=80',
    category: 'women',
    inventory: 50,
    variants: [
      {
        name: 'size',
        options: ['XS', 'S', 'M', 'L'],
      },
      {
        name: 'color',
        options: ['Blue', 'Pink', 'Yellow'],
      },
    ],
    discount: 20,
    rating: 4.8,
  },
  {
    name: 'Kids Denim Jacket',
    description: 'A stylish and durable denim jacket for kids.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    category: 'kids',
    inventory: 75,
    variants: [
      {
        name: 'size',
        options: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
      },
      {
        name: 'color',
        options: ['Blue', 'Black'],
      },
    ],
    isNew: true,
    rating: 4.2,
  },
  {
    name: 'Home Decor Pillow',
    description: 'A decorative pillow to enhance your home decor.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0655b3a6e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'home',
    inventory: 200,
    variants: [
      {
        name: 'color',
        options: ['Gray', 'Beige', 'Navy'],
      },
    ],
    discount: 15,
    rating: 4.6,
  },
];

async function seed() {
  try {
    await connectToDatabase();

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 