# eSalesOne - Modern eCommerce Checkout Flow

A modern eCommerce checkout flow simulation built with Next.js, MongoDB, and Mailtrap.

## Features

- 🛍️ Product browsing with variants and inventory tracking
- 🛒 Shopping cart with persistent storage
- 💳 Secure checkout process
- 📧 Order confirmation emails via Mailtrap
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Email**: Mailtrap
- **Styling**: Tailwind CSS, Heroicons

## Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Mailtrap account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
MAILTRAP_HOST=your_mailtrap_host
MAILTRAP_PORT=your_mailtrap_port
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
MAILTRAP_FROM=noreply@esalesone.com
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/esalesone.git
   cd esalesone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your environment variables

4. Seed the database:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── products/          # Product pages
│   └── thank-you/         # Thank you page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── products/         # Product components
│   └── ui/               # UI components
├── context/              # React context
├── lib/                  # Utility functions
├── models/               # MongoDB models
└── scripts/              # Database scripts
```

## API Routes

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get a single product
- `POST /api/orders` - Create a new order
- `GET /api/orders/[orderNumber]` - Get order details

## Development

- Run development server:
  ```bash
  npm run dev
  ```

- Build for production:
  ```bash
  npm run build
  ```

- Start production server:
  ```bash
  npm start
  ```

## Testing

- Run tests:
  ```bash
  npm test
  ```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

3. Set up environment variables in your hosting platform

4. Deploy the application

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mailtrap](https://mailtrap.io/)
- [Heroicons](https://heroicons.com/)

## Transaction Simulation

To test different transaction outcomes, use the following card numbers:
- `1` at the end: ✅ Approved Transaction
- `2` at the end: ❌ Declined Transaction
- `3` at the end: ⚠️ Gateway Failure

Example: `4242424242424241` for an approved transaction

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── checkout/          # Checkout page
│   ├── thank-you/         # Thank you page
│   └── page.tsx           # Landing page
├── components/            # React components
│   └── ui/               # UI components
├── lib/                  # Utility functions
├── models/               # MongoDB models
└── types/                # TypeScript types
```

## Technologies Used

- Next.js 14
- TypeScript
- MongoDB with Mongoose
- Tailwind CSS
- React Hook Form with Zod
- Nodemailer with Mailtrap
- React Icons

## License

MIT 