// ✅ 1. Load environment variables at the very top
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from the correct path
dotenv.config({ path: path.resolve(__dirname, '.env') });

// ✅ 2. Debug: check if env vars are available
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);

// ✅ 3. Continue with Google OAuth setup
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // First, try to find user by Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      // If no user with Google ID, check if user exists with same email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // User exists with email but no Google ID - link the accounts
        user.googleId = profile.id;
        await user.save();
      } else {
        // Create new user
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
      }
    }
    
    return done(null, user);
  } catch (err) {
    console.error('Google OAuth error:', err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
