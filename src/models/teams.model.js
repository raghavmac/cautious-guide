import mongoose, { SchemaTypes } from 'mongoose';

/**
 * Team Schema
 */
const TeamSchema = new mongoose.Schema({
  companyId: { type: SchemaTypes.ObjectId, ref: 'Company', required: true },
  // unique to satisfy composite rule for Object Ids
  userId: { type: SchemaTypes.ObjectId, ref: 'User', unique: true, required: true },
  contactUser: { type: Boolean, default: false }
}, {
  versionKey: false,
  timestamps: true
});

/**
 * @typedef Team
 */
export default mongoose.model('Team', TeamSchema);
