import { Users } from '../../config/sequelize';

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
  return res.json({});
}

export default { get, getActiveUsers };
