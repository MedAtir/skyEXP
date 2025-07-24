import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Simple model definition
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;