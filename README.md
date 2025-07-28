# Marketplace Application

A Facebook-style marketplace application built with React 19, Next.js 15, and Supabase.

## Features

- 📝 **Create Listing**: Upload photos and fill in title, description, price, email, and category
- 🔍 **Browse & Search**: View all listings in a responsive grid with category filtering and search
- 📄 **Listing Details**: Dedicated pages for each item with full information and seller contact
- 💬 **Message Seller**: Send messages to sellers with email notifications

## Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for images
- **Email**: Nodemailer with Gmail

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd marketplace
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Create the following tables in your Supabase database:

#### Listings Table
```sql
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT DEFAULT 'Palo Alto, CA',
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Messages Table
```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id),
  buyer_email TEXT NOT NULL,
  seller_email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Storage Bucket
1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `listings`
3. Set the bucket to public
4. Update the bucket policy to allow uploads:

```sql
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'listings');
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (for Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Note**: For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `EMAIL_PASS`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Creating a Listing
1. Navigate to "Seller help" in the sidebar
2. Click "Item for sale"
3. Fill in the form with title, price, category, email, and description
4. Upload a photo
5. Click "Save Listing"

### Browsing Listings
1. Use the category filters in the sidebar
2. Use the search bar to find specific items
3. Click on any listing card to view details

### Messaging Sellers
1. View a listing's details page
2. Fill in your email and message
3. Click "Send Message"
4. The seller will receive an email notification

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── [listingId]/       # Dynamic listing pages
│   ├── create-item/       # Create listing page
│   ├── listing-type/      # Listing type selection
│   └── your-listings/     # User's listings
├── components/            # Reusable components
│   ├── ListingCard.tsx
│   ├── Sidebar.tsx
│   └── Topbar.tsx
└── lib/                  # Utility functions
    ├── supabase.ts       # Supabase client
    └── email.ts          # Email service
```

## Features Implemented

✅ **Create Listing**: Complete form with photo upload, validation, and Supabase storage
✅ **Browse & Search**: Real-time filtering by category and search terms
✅ **Listing Details**: Dynamic pages with full item information
✅ **Message Seller**: Form validation and email notifications
✅ **Facebook-like UI**: Clean, modern design with proper styling
✅ **Responsive Design**: Works on desktop and mobile devices

## Troubleshooting

### Supabase Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure the database tables are created correctly

### Email Notifications Not Working
- Verify Gmail credentials in environment variables
- Check that 2FA is enabled and app password is generated
- Check server logs for email errors

### Image Upload Issues
- Ensure the `listings` storage bucket exists in Supabase
- Check bucket permissions are set to public
- Verify the storage policy allows uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
