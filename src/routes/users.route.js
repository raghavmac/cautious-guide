import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/users')
  /** GET /api/users - Get an user */
  .get(userCtrl.get);

router.route('/topActiveUsers')
  /** GET /api/topActiveUsers - Get top active users */
  .get(userCtrl.getActiveUsers);

export default router;
