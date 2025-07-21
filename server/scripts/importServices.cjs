const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Service = require('../models/Service');

// Load static services data
const servicesData = require(path.resolve(__dirname, '../../src/data/servicesData.js'));
const services = servicesData.default || servicesData;

const MONGO_URI="mongodb://mongo:RDVYYzqgdSXVejiZcteZEQsEZFKNgKPA@metro.proxy.rlwy.net:17504";

async function importServices() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  // Remove all existing services (optional, comment out if you want to keep existing)
  // await Service.deleteMany({});

  // Map static fields to Service model
  const docs = services.map(s => ({
    title: s.title,
    description: s.description,
    details: s.description, // Use description for details if no separate field
    price: s.price,
    category: s.category,
    imageUrl: s.image,
    visibility: 'Published',
    // Add more fields if needed
  }));

  await Service.insertMany(docs);
  console.log('Imported services:', docs.length);
  mongoose.disconnect();
}

importServices().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});

// Usage: node server/scripts/importServices.cjs 