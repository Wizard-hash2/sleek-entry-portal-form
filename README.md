
# Price Tracker - Smart Price Management System

A modern web application for tracking product prices across different suppliers, built with React, TypeScript, and Supabase.

## 🚀 Features

### Authentication
- **Secure Login/Signup**: User authentication powered by Supabase
- **User Profiles**: Store user information including name, email, and market sector
- **Session Management**: Automatic session handling with secure logout

### Product Management
- **Product Catalog**: View all products with their units of measurement
- **Real-time Data**: Live updates from Supabase database
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Price Tracking
- **Add Prices**: Easy form to record new prices for products from different suppliers
- **Supplier Management**: Track prices from multiple suppliers
- **Historical Data**: All price records are timestamped for historical analysis

### Analytics & Trends
- **Price Trends Charts**: Visual representation of price changes over time
- **Recent Records**: Quick view of the latest price entries
- **Interactive Charts**: Built with Recharts for smooth user experience

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL database, Authentication, Real-time)
- **Charts**: Recharts library
- **Icons**: Lucide React
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 📊 Database Schema

### Tables

#### `users`
- `id` (UUID, Primary Key)
- `name` (Text)
- `email` (Text)
- `market` (Text)

#### `products`
- `id` (Integer, Primary Key)
- `name` (Text)
- `unit` (Text)

#### `suppliers`
- `id` (Integer, Primary Key)
- `name` (Text)
- `contact_info` (Text)

#### `prices`
- `id` (Integer, Primary Key)
- `product_id` (Integer, Foreign Key)
- `supplier_id` (Integer, Foreign Key)
- `price` (Numeric)
- `recorded_at` (Timestamp)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd price-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Set up the database tables using the schema above
   - Update the Supabase configuration in `src/integrations/supabase/client.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage Guide

### Getting Started
1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your dashboard with your credentials
3. **Dashboard**: Navigate through different sections using the top navigation

### Managing Products
- View all products in the main dashboard
- Each product shows its ID, name, and unit of measurement
- Products are automatically loaded from the database

### Adding Prices
1. Go to the "Add Price" section
2. Select a product from the dropdown
3. Choose a supplier
4. Enter the price amount
5. Click "Add Price" to save

### Viewing Trends
- Navigate to "Price Trends" to see charts
- View historical price data in an interactive line chart
- Check recent price records in the table below

### Account Management
- Use the logout button in the top navigation
- Your session is automatically managed and secured

## 🎨 UI Components

The application uses a modern design system with:
- **Responsive Layout**: Adapts to all screen sizes
- **Dark/Light Theme**: Clean, professional appearance
- **Interactive Elements**: Smooth hover effects and transitions
- **Loading States**: Clear feedback during data operations
- **Error Handling**: User-friendly error messages

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AddPriceForm.tsx
│   ├── AuthWrapper.tsx
│   ├── LoginForm.tsx
│   ├── PriceTrends.tsx
│   └── ProductList.tsx
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── pages/              # Page components
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

### Key Features Implementation

#### Authentication Flow
- Protected routes using `AuthWrapper` component
- Automatic session management
- Secure logout functionality

#### Data Management
- Real-time data fetching with TanStack Query
- Optimistic updates for better UX
- Error handling and loading states

#### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interfaces

## 🚀 Deployment

### Using Lovable (Recommended)
1. Open your Lovable project
2. Click the "Publish" button in the top right
3. Your app will be deployed automatically

### Manual Deployment
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel, Netlify, or any static hosting service
   - Make sure to configure environment variables for Supabase

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Authentication**: Secure user authentication with Supabase Auth
- **Input Validation**: Client-side and server-side validation
- **HTTPS**: Secure data transmission

## 📈 Performance

- **Code Splitting**: Automatic code splitting with Vite
- **Lazy Loading**: Components loaded on demand
- **Caching**: Smart data caching with React Query
- **Optimized Bundle**: Tree-shaking and minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure all dependencies are properly installed
4. Check the network tab for API call failures

## 🔮 Future Enhancements

- **Export Data**: CSV/Excel export functionality
- **Advanced Analytics**: More detailed price analysis
- **Notifications**: Price alerts and notifications
- **Bulk Operations**: Bulk price updates
- **API Integration**: Connect with external price feeds
- **Mobile App**: Native mobile application

---

**Built with ❤️ using Lovable, React, and Supabase**
