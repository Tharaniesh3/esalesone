import nodemailer from 'nodemailer';

interface EmailConfig {
  to: string;
  orderNumber: string;
  customerName: string;
  items: Array<{
    product: {
      name: string;
      price: number;
    };
    quantity: number;
    selectedVariant?: {
      color?: string;
      size?: string;
    };
  }>;
  total: number;
}

// Create a transporter using Mailtrap credentials
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export async function sendOrderConfirmationEmail(config: EmailConfig) {
  const { to, orderNumber, customerName, items, total } = config;

  // Create email content
  const itemsList = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.product.name}
        ${item.selectedVariant?.color ? ` - Color: ${item.selectedVariant.color}` : ''}
        ${item.selectedVariant?.size ? ` - Size: ${item.selectedVariant.size}` : ''}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        $${(item.product.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb; margin-bottom: 20px;">Order Confirmation</h1>
      
      <p>Dear ${customerName},</p>
      
      <p>Thank you for your order! We're pleased to confirm that we've received your order and it's being processed.</p>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #1f2937; margin-bottom: 15px;">Order Details</h2>
        <p style="margin-bottom: 5px;"><strong>Order Number:</strong> ${orderNumber}</p>
        <p style="margin-bottom: 5px;"><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      
      <h2 style="color: #1f2937; margin: 20px 0;">Order Summary</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Item</th>
            <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Quantity</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
            <td style="padding: 10px; text-align: right;"><strong>$${total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <h3 style="color: #1f2937; margin-bottom: 15px;">What's Next?</h3>
        <ol style="color: #4b5563; line-height: 1.6;">
          <li>We'll process your order and prepare it for shipping.</li>
          <li>You'll receive another email with tracking information once your order ships.</li>
          <li>If you have any questions, please don't hesitate to contact our customer service team.</li>
        </ol>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #6b7280;">
        <p>Thank you for shopping with us!</p>
        <p>eSalesOne Team</p>
      </div>
    </div>
  `;

  // Send email
  await transporter.sendMail({
    from: process.env.MAILTRAP_FROM || 'noreply@esalesone.com',
    to,
    subject: `Order Confirmation - ${orderNumber}`,
    html,
  });
}

export const sendOrderFailureEmail = async (
  email: string,
  orderNumber: string,
  reason: string
) => {
  const mailOptions = {
    from: '"eSalesOne" <noreply@esalesone.com>',
    to: email,
    subject: `Order Failed - ${orderNumber}`,
    html: `
      <h1>We're sorry, your order could not be processed</h1>
      <p>Order Number: ${orderNumber}</p>
      <p>Reason: ${reason}</p>
      <p>Please try again or contact our support team for assistance.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}; 