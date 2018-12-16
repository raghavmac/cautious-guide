import mongoose from 'mongoose';

/**
 * Company Schema
 */
const CompanySchema = new mongoose.Schema({
  name: { type: String }
}, {
  versionKey: false,
  timestamps: true
});

/**
 * @typedef Company
 */
export default mongoose.model('Company', CompanySchema);
