import mongoose, { Schema } from 'mongoose';

const galleryItemSchema = new Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  category: { type: String, default: 'general' }
}, { timestamps: true });

const GalleryItem = mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;