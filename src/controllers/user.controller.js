import { Users, Teams, Listings, Applications } from '../../config/sequelize';

/**
 * Get active users list
 * @property {number} req.query.page - Number to get paged results
 * @returns {User[]}
 */
async function getActiveUsers(req, res) {
  const users = await Users.getActiveUsers();
  return res.json(users);
}

/**
 * Get user
 * @returns {User}
 */
async function get(req, res) {
  const { id, created_at, name } = await Users.getById(req.query.id);
  const connectedCompanies = Teams.getAllByUser(req.query.id);
  const listings = Listings.getAllByUser(req.query.id);
  const applications = Applications.getAllByUser(req.query.id);

  // Combine all resources and return the response
  return res.json({
    id,
    created_at,
    name,
    companies: await connectedCompanies,
    createdListings: await listings,
    applications: await applications
  });
}

export default { get, getActiveUsers };
