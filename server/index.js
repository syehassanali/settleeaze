import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import bookingRoutes from './routes/booking.js';
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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Serve static files from Vite build
const clientDistPath = path.resolve(__dirname, 'client-dist');
if (fs.existsSync(clientDistPath)) {
  app.use(serveStatic(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}
