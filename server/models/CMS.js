import mongoose from 'mongoose';

const cmsSchema = new mongoose.Schema({
  homepageHeadline: { type: String },
  homepageSubheading: { type: String },
  heroText: { type: String },
  footerText: { type: String },
  servicesDesc: { type: String },
  packagesDesc: { type: String },
  faqs: { type: String },
  about: { type: String },
  terms: { type: String },
  bannerImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CMS', cmsSchema); 