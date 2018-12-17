import express from 'express';
import usersRoutes from './users.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health - Check service health */
router.get('/health', (req, res) => res.send({ status: 'ok' }));


// mount user routes
router.use('/', usersRoutes);

export default router;
