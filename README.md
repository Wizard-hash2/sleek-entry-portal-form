
## 🧮 Problem Statement: Price Tracker Tool for Retail Shopkeepers

Shopkeepers in informal markets face difficulties managing their inventory due to rapidly fluctuating supplier prices. They often lack digital tools to monitor, compare, and analyze price trends efficiently. This project aims to empower them with a simple, intelligent, and accessible solution.

Pitch Derk: https://www.canva.com/design/DAGoj8Vlfm0/19NBrJHYyz7rPDmIs_pjHQ/edit?utm_content=DAGoj8Vlfm0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
---

# 🛍️ Price Tracker - Smart Price Management System

A modern web application for tracking product prices across different suppliers, built with React, TypeScript, and Supabase.

---

## 🚀 Features

### 🛡️ Authentication

* **Secure Login/Signup**: Supabase Auth integration
* ![image](https://github.com/user-attachments/assets/1bff9144-495e-4bff-8dc1-bbf9488f5ec2)
* ![image](https://github.com/user-attachments/assets/eb8e0c3f-a8c9-40ef-b01e-b9261c78c4bd)


* **User Profiles**: Name, email, and market sector info
* **Session Management**: Persistent user sessions with secure logout

### 📦 Product Management

* **Product Catalog**: Products and units
* **Real-time Sync**: Live updates from Supabase
* **Responsive Design**: Desktop and mobile optimized
* ![image](https://github.com/user-attachments/assets/81ada812-fafe-4296-becf-6615cfab91b1)


### 💰 Price Tracking

* **Add Prices**: Record supplier prices via form
* **Supplier Management**: Compare prices from different vendors
* **Historical Logging**: Timestamped price records

### 📊 Analytics & Trends

* **Interactive Charts**: Visualize historical price trends (Recharts)
* **Latest Entries**: Quick view of new price data

---

## 🛠️ Tech Stack

* **Frontend**: React 18 + TypeScript
* **Styling**: Tailwind CSS, shadcn/ui
* **Backend**: Supabase (PostgreSQL, Auth, Realtime)
* **Charts**: Recharts
* **Icons**: Lucide React
* **State Management**: React Query (TanStack Query)
* **Routing**: React Router DOM
* **Build Tool**: Vite

---

## 🧱 Database Schema

### users

* id (UUID, PK)
* name (Text)
* email (Text)
* market (Text)

### products

* id (Integer, PK)
* name (Text)
* unit (Text)

### suppliers

* id (Integer, PK)
* name (Text)
* contact\_info (Text)

### prices

* id (Integer, PK)
* product\_id (FK)
* supplier\_id (FK)
* price (Numeric)
* recorded\_at (Timestamp)

---

## 🔧 Setup & Installation

### Prerequisites

* Node.js (v18+)
* npm or yarn
* Supabase project

### Steps

```bash
# Clone project
git clone <repo-url>
cd price-tracker

# Install dependencies
npm install

# Configure Supabase
# Add keys in src/integrations/supabase/client.ts

# Start dev server
npm run dev
```

Visit: `http://localhost:5173`

---

## 📱 Usage Guide

### 1. Sign Up / Login

* Register with your email
* Log in to view dashboard
![image](https://github.com/user-attachments/assets/e90e9f87-8ff8-4d05-8660-47a1cbedf391)

### 2. Dashboard Navigation

* Navigate using the top navbar
![image](https://github.com/user-attachments/assets/51751598-a8d8-4617-8907-275f9c03a313)

### 3. Add Price

* Select product and supplier
* Input price
* Save entry
* ![image](https://github.com/user-attachments/assets/ca250849-8eb8-4e02-a547-7f6c7f057f7b)


### 4. Price Trends

* View line chart trends
* Inspect historical records

### 5. Manage Account

* Logout securely

---

## 🎨 UI Highlights

* **Mobile-first** layout
* **Light/Dark** themes
* **Smooth transitions** and feedback
* **Clear error messages**

---

## 🗂️ Project Structure

```
src/
├── components/
│   └── ui/
│   ├── AddPriceForm.tsx
│   ├── LoginForm.tsx
│   ├── PriceTrends.tsx
│   └── ProductList.tsx
├── integrations/supabase/
├── pages/
│   ├── Dashboard.tsx
│   
├── hooks/
└── lib/
```

---

## 🚀 Deployment

### Via Lovable

* Click Publish in Lovable dashboard

### Manual

```bash
npm run build
# Deploy to Vercel, Netlify, or others
```

---

## 🔐 Security

* **RLS** policies in Supabase
* **Input validation**
* **HTTPS** support

---

## ⚙️ Performance

* Code splitting
* Lazy loading
* Smart caching
* Optimized bundles

---

## 🔮 Future Enhancements

* Export to CSV/Excel
* Alerts & notifications
* Bulk updates
* External price API integration
* Native mobile version

---

## 🧠 Conclusion

**Price Tracker** is designed for social impact—enabling informal market shopkeepers to make informed, data-driven purchasing decisions using a lightweight, modern web app. Its secure, real-time, and mobile-friendly design ensures accessibility and efficiency.

> Built with ❤️ using React, Supabase, and Tailwind CSS.
