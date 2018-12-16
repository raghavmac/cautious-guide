import mongoose, { SchemaTypes } from 'mongoose';

/**
 * Application Schema
 */
const ApplicationSchema = new mongoose.Schema({
  userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  listingId: { type: SchemaTypes.ObjectId, ref: 'Listing', required: true },
  coverLetter: { type: String }
}, {
  versionKey: false,
  timestamps: true
});

/**
 * @typedef Application
 */
export default mongoose.model('Application', ApplicationSchema);
