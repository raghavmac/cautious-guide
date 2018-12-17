import mongoose, { SchemaTypes } from 'mongoose';
import _map from 'lodash/map';
import _groupBy from 'lodash/groupBy';

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
 * Statics
 */
ApplicationSchema.statics = {
  /**
   * Get applications count for list of users
   * @param {ObjectId<[]} userIds - The array of user ids.
   * @returns {Promise<Application[]>}
   */
  getAllCountsByUser(userIds) {
    return this.find({ userId: userIds })
      .exec()
      .then(applications =>
        _map(_groupBy(applications, 'userId'), (application, id) => ({
          _id: id,
          count: application.length
        })
      )
    );
  }
};

/**
 * @typedef Application
 */
export default mongoose.model('Application', ApplicationSchema);
