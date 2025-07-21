import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import Service from './models/Service.js'; // Import the Service model
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import bookingRoutes from './routes/booking.js';
import packageRoutes from './routes/package.js';
import inquiryRoutes from './routes/inquiry.js';
import adminUserRoutes from './routes/adminUser.js';
import paymentRoutes from './routes/payment.js';
import logRoutes from './routes/log.js';
import notificationRoutes from './routes/notification.js';
import cmsRoutes from './routes/cms.js';
import statsRoutes from './routes/stats.js';
import serviceRoutes from './routes/service.js';
import bankingRoutes from './routes/banking.js';
import publicRoutes from './routes/public.js'; // Import the new public routes
import './passport.js';
import fs from 'fs';
import serveStatic from 'serve-static';

// ✅ Fix dotenv for ESModules
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') }); // ✅ Ensures proper .env loading

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

const app = express();

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.send('✅ Backend is live and healthy!');
});

app.use(cors({
  origin: ['https://settleeaze.com', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session for passport (Google OAuth)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// --- API Routes Registration ---
// All API routes should be registered here, before the static file serving.
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);

// Admin-specific routes
app.use('/api/admin/packages', packageRoutes);
app.use('/api/admin/inquiries', inquiryRoutes);
app.use('/api/admin/admin-users', adminUserRoutes);
app.use('/api/admin/payments', paymentRoutes);
app.use('/api/admin/logs', logRoutes);
app.use('/api/admin/notifications', notificationRoutes);
app.use('/api/admin/cms', cmsRoutes);
app.use('/api/admin/stats', statsRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/bookings', bookingRoutes);
app.use('/api/admin/services', serviceRoutes);
app.use('/api/admin/banking', bankingRoutes);


// --- Static File Serving & Catch-all for React Frontend ---
// Serve uploaded images first
const uploadsPath = path.resolve(__dirname, 'uploads');
if (fs.existsSync(uploadsPath)) {
  app.use('/uploads', serveStatic(uploadsPath));
}

// Then, serve static files from the Vite build directory
const clientDistPath = path.resolve(__dirname, 'client-dist');
if (fs.existsSync(clientDistPath)) {
  app.use(serveStatic(clientDistPath));
  // The catch-all handler must be defined AFTER all API routes.
  // It sends the main index.html for any non-API request.
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// --- MongoDB Connection and Server Startup ---
const mongoURI = process.env.MONGO_URL || process.env.MONGO_URI || process.env.DATABASE_URL;

console.log("🔍 Attempting to connect to MongoDB...");
console.log("🔍 MONGO_URL value:", process.env.MONGO_URL);
console.log("🔍 MONGO_URI value:", process.env.MONGO_URI);
console.log("🔍 DATABASE_URL value:", process.env.DATABASE_URL);
console.log("🔍 Final mongoURI:", mongoURI);
console.log("🔍 MongoDB URI available:", !!mongoURI);
if (mongoURI) {
  console.log("🔍 MongoDB URI starts with:", mongoURI.substring(0, 20) + "...");
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected successfully!");
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  console.error('❌ MongoDB URI was:', mongoURI ? 'Set' : 'Not set');
});
