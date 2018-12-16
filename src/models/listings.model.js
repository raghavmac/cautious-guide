import mongoose, { Schema } from 'mongoose';

/**
 * Listing Schema
 */
const ListingSchema = new mongoose.Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  description: { type: String }
}, {
  versionKey: false,
  timestamps: true
});

/**
 * @typedef Listing
 */
export default mongoose.model('Listing', ListingSchema);
