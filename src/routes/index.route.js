import express from 'express';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health - Check service health */
router.get('/health', (req, res) => res.send({ status: 'ok' }));

export default router;
