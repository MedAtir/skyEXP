import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
  service: { 
    type: Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true 
  },
  date: { type: Date, required: true },
  participants: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;