import mongoose from 'mongoose';

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

const BankingService = mongoose.model('BankingService', BankingServiceSchema);
export default BankingService; 