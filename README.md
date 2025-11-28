# TableTime - Dine-In Restaurant Management System

A full-stack restaurant management system designed for dine-in establishments. This project provides a comprehensive solution for order management, menu handling, table management, and real-time updates using WebSocket technology.

## Project Overview

TableTime is a modern restaurant management platform that streamlines operations for dine-in restaurants. It enables customers to browse menus and place orders from their tables, while restaurant staff can manage orders, kitchen operations, and billing seamlessly.

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Socket.io** for real-time communication
- **WebSocket** support
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security
- **CORS** for cross-origin requests
- **Express Validator** for input validation
- **Rate limiting** with express-rate-limit

### Frontend
- **React 18** with TypeScript
- **Vite** for fast build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **Tanstack React Query** for data fetching
- **Radix UI** primitives
- **Lucide React** for icons
- **Supabase** client library

## Project Structure

```
tabletime-dinein-main/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Server entry point
│   │   ├── config/
│   │   │   └── db.js               # Database configuration
│   │   ├── controllers/            # Business logic
│   │   │   ├── authController.js
│   │   │   ├── menuItemController.js
│   │   │   ├── orderController.js
│   │   │   └── tableController.js
│   │   ├── middleware/
│   │   │   └── auth.js             # Authentication middleware
│   │   ├── models/                 # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── MenuItem.js
│   │   │   ├── Order.js
│   │   │   ├── OrderItem.js
│   │   │   └── Table.js
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.js
│   │   │   ├── menuItemRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── tableRoutes.js
│   │   └── services/
│   │       └── websocket.js        # WebSocket service
│   ├── package.json
│   ├── checkuser.js
│   └── .env                        # Environment variables
│
└── frontend/
    ├── src/
    │   ├── main.tsx               # React entry point
    │   ├── App.tsx
    │   ├── components/
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── customer/          # Customer-facing components
    │   │   │   ├── TableHome.tsx
    │   │   │   ├── TableMenu.tsx
    │   │   │   ├── TableOrders.tsx
    │   │   │   └── TableBill.tsx
    │   │   └── ui/               # Reusable UI components
    │   ├── contexts/
    │   │   └── AuthContext.tsx    # Authentication context
    │   ├── pages/
    │   │   ├── Index.tsx
    │   │   ├── Login.tsx
    │   │   ├── Admin.tsx
    │   │   ├── Kitchen.tsx
    │   │   ├── Server.tsx
    │   │   ├── Table.tsx
    │   │   └── NotFound.tsx
    │   ├── services/
    │   │   └── api.ts             # API client
    │   └── lib/
    │       └── utils.ts           # Utility functions
    ├── vite.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── package.json
    └── index.html
```

## Features

### Core Features
- 🔐 **User Authentication** - JWT-based authentication with role-based access
- 📋 **Menu Management** - Dynamic menu items with categories and pricing
- 🛒 **Order Management** - Create, update, and track orders in real-time
- 📊 **Table Management** - Track table status and capacity
- 💳 **Billing System** - Generate and manage bills for completed orders
- 🔔 **Real-time Updates** - WebSocket integration for instant order updates

### User Roles
- **Customer** - Browse menu, place orders, view bill
- **Kitchen Staff** - Receive and prepare orders
- **Server** - Manage table orders and billing
- **Admin** - System administration and management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Barath2662/tabletime.git
   cd tabletime-dinein-main
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

#### Backend (.env)
Create a `.env` file in the `backend` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

#### Frontend
Create a `.env.local` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000
```

### Running the Application

#### Development Mode

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

#### Production Build

1. **Backend Production**
   ```bash
   cd backend
   npm start
   ```

2. **Frontend Production Build**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Menu Items
- `GET /api/menu-items` - Get all menu items
- `POST /api/menu-items` - Create menu item (Admin)
- `PUT /api/menu-items/:id` - Update menu item (Admin)
- `DELETE /api/menu-items/:id` - Delete menu item (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Tables
- `GET /api/tables` - Get all tables
- `POST /api/tables` - Create table (Admin)
- `PUT /api/tables/:id` - Update table status
- `DELETE /api/tables/:id` - Delete table (Admin)

## WebSocket Events

Real-time communication is handled through Socket.io:
- `order:created` - New order placed
- `order:updated` - Order status changed
- `order:completed` - Order ready for serving
- `table:updated` - Table status changed

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting to prevent abuse
- CORS configuration for secure API access
- Helmet.js for HTTP header security
- Input validation on all endpoints
- Protected routes with authentication middleware

## Development Guidelines

### Code Style
- Use ES6+ syntax
- Follow RESTful API conventions
- Use TypeScript for frontend type safety
- Implement proper error handling

### Git Workflow
- Use meaningful commit messages
- Create feature branches for new features
- Submit pull requests for review

## Available Scripts

### Backend
- `npm start` - Run production server
- `npm run dev` - Run development server with hot reload

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Database Schema

### User
- email (unique)
- password (hashed)
- role (customer, kitchen, server, admin)
- createdAt, updatedAt

### MenuItem
- name
- description
- price
- category
- image
- available
- createdAt, updatedAt

### Order
- tableNumber
- items (OrderItem references)
- status (pending, cooking, ready, served, completed)
- totalAmount
- createdAt, updatedAt

### OrderItem
- orderId
- menuItemId
- quantity
- specialInstructions
- createdAt, updatedAt

### Table
- tableNumber
- capacity
- status (available, occupied, reserved)
- currentOrderId
- createdAt, updatedAt

## Troubleshooting

### Backend Won't Start
- Ensure MongoDB is running
- Check `.env` file configuration
- Verify all dependencies are installed: `npm install`

### Frontend Issues
- Clear cache: `rm -rf node_modules && npm install`
- Check API URL in `.env.local`
- Ensure backend server is running

### Database Connection Issues
- Verify MongoDB connection string in `.env`
- Check MongoDB service status
- Ensure network access to MongoDB

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

This project is part of PG 2025-27 PSGTECH.

## Support

For issues and questions, please contact the development team or create an issue in the repository.

## Project Status

**Current Version**: 1.0.0  
**Last Updated**: November 2025  
**Status**: Active Development

---

**Owner**: [Barath2662](https://github.com/Barath2662)  
**Repository**: [tabletime](https://github.com/Barath2662/tabletime)
