import _map from 'lodash/map';

import Users from '../models/users.model';
import Listings from '../models/listings.model';
import Applications from '../models/applications.model';
import Teams from '../models/teams.model';
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

/**
 * Get user
 * @returns {User}
 */
async function get(req, res) {
  const { _id: id, name, createdAt } = await Users.get(req.query.id);
  const companies = Teams.get(req.query.id);
  const listings = Listings.getAllCreatedByUser(req.query.id);
  const applications = Applications.getAllByUser(req.query.id);

  // check for user and combine its resources for response
  return res.json({
    id,
    name,
    createdAt,
    companies: await companies,
    createdListings: await listings,
    applications: await applications
  });
}

export default { get, getActiveUsers };
