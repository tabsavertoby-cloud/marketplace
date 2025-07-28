import nodemailer from 'nodemailer';

// Create a transporter using Gmail (you'll need to set up app passwords)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use app password, not regular password
  },
});

export async function sendMessageNotification(
  sellerEmail: string,
  buyerEmail: string,
  message: string,
  listingTitle: string
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: `New message about your listing: ${listingTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1877f2;">New Message from Buyer</h2>
          <p><strong>Listing:</strong> ${listingTitle}</p>
          <p><strong>From:</strong> ${buyerEmail}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${message}
          </div>
          <p style="margin-top: 20px; color: #666;">
            Reply to this email to respond to the buyer.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 