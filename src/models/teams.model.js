import mongoose, { Types, SchemaTypes } from 'mongoose';

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
 * Statics
 */
TeamSchema.statics = {
  /**
   * Get a company
   * @param {ObjectId} userId - The objectId of a user.
   * @returns {Promise<Team[]>}
   */
  get(userId) {
    return this.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $group: { _id: '$companyId', contactUser: { $first: '$contactUser' } } },
      {
        $lookup: {
          from: 'companies',
          localField: '_id',
          foreignField: '_id',
          as: 'companies'
        }
      },
      { $unwind: '$companies' },
      {
        $project: {
          id: '$_id',
          createdAt: '$companies.createdAt',
          name: '$companies.name',
          contactUser: '$contactUser'
        }
      }
    ])
    .exec()
    .then();
  }
};

/**
 * @typedef Team
 */
export default mongoose.model('Team', TeamSchema);
