import mongoose, { Schema } from 'mongoose';
import _head from 'lodash/head';

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
 * Statics
 */
ListingSchema.statics = {
  /**
   * Get listings of an active user
   * @param {String} page - The set of listings to be returned.
   * @returns {Promise<Listing>}
   */
  getActiveUserListings(page = 1) {
    return this.aggregate([
      {
        $group: {
          _id: '$createdBy',
          total: { $sum: 1 },
          listings: { $push: '$name' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $sort: { total: -1 } },
      {
        $project: {
          id: '$_id',
          createdAt: '$user.createdAt',
          name: '$user.name',
          listings: '$listings'
        }
      },
      { $facet: { data: [{ $limit: 10 * Number(page) }] } }
    ])
    .exec()
    .then(listings => _head(listings).data || []);
  }
};

/**
 * @typedef Listing
 */
export default mongoose.model('Listing', ListingSchema);
