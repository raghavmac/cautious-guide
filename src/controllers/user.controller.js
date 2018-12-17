import _map from 'lodash/map';

import Listings from '../models/listings.model';
import Applications from '../models/applications.model';
import { mergeRelations } from '../helpers/utils';

/**
 * Get active users list
 * @property {number} req.query.page - Number to get paged results
 * @returns {User[]}
 */
async function getActiveUsers(req, res) {
  const listings = await Listings.getActiveUserListings(req.query.page);
  const applications = await Applications.getAllCountsByUser(_map(listings, '_id'));
  // merge the results and return the response
  return res.json(mergeRelations(listings, applications, '_id'));
}

export default { getActiveUsers };
