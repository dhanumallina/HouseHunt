# HouseHunt - House Rental Platform

A production-quality full-stack MERN application for house rental listings, property search, and landlord-tenant connections.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with role-based access (Tenant, Landlord, Admin)
- **Property Listings**: Create, read, update, and delete property listings
- **Advanced Search & Filters**: Search by location, price, bedrooms, bathrooms, amenities
- **Favorites System**: Save favorite properties for later
- **Contact Landlords**: Send messages directly to property owners
- **User Dashboard**: Personalized dashboard for managing properties and messages
- **Responsive Design**: Mobile, tablet, and desktop optimized UI
- **Real-time Notifications**: Toast notifications for user actions
- **Image Gallery**: Multiple property images with Swiper carousel
- **Profile Management**: Update user profile and settings

## 📋 Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Swiper
- React Icons
- React Hot Toast
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer (file uploads)
- Express Validator

## 📁 Project Structure

```
HouseHunt/
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/dhanumallina/HouseHunt.git
cd HouseHunt

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Environment Variables

**Client** - `client/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

**Server** - `server/.env`
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Run the Application

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

Application will be available at `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/profile       - Get user profile
PUT    /api/auth/profile       - Update user profile
POST   /api/auth/logout        - Logout user
```

### Property Endpoints
```
GET    /api/properties         - Get all properties
GET    /api/properties/:id     - Get single property
POST   /api/properties         - Create property (Protected)
PUT    /api/properties/:id     - Update property (Protected)
DELETE /api/properties/:id     - Delete property (Protected)
```

### Favorites Endpoints
```
GET    /api/favorites          - Get user favorites
POST   /api/favorites/:id      - Add to favorites
DELETE /api/favorites/:id      - Remove from favorites
```

### Contact Endpoints
```
POST   /api/contact            - Send message to landlord
GET    /api/contact            - Get user messages (Protected)
```

## 🌐 Deployment

### Frontend - Vercel
1. Push code to GitHub
2. Connect GitHub repository to Vercel
3. Set environment variable `VITE_API_URL` to your backend URL
4. Deploy

### Backend - Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set all environment variables
5. Deploy

## 📸 Screenshots

*(Add screenshots here)*

## 👨‍💻 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

MIT License

## 📧 Contact

For questions or support, contact: dhanumallina@example.com
