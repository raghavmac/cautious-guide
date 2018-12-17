import Listings from '../models/listings.model';

/**
 * Get active users list
 * @property {number} req.query.page - Number to get paged results
 * @returns {User[]}
 */
async function getActiveUsers(req, res) {
  const listings = await Listings.getActiveUserListings(req.query.page);

  return res.json(listings);
}

export default { getActiveUsers };
