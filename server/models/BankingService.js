const mongoose = require('mongoose');

const BankingServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  estimatedProcessingTime: { type: String },
  requiredDocuments: { type: [String], default: [] },
  externalLinks: { type: [String], default: [] },
  cost: { type: String },
  visibility: { type: Boolean, default: true },
  serviceCategory: { type: String },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('BankingService', BankingServiceSchema); 