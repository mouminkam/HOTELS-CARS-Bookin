// backend/routes/adminRoutes.js
import express from 'express';
import { getStats ,getDashboardData} from '../controllers/adminOverView.js';

const OverviewRouter = express.Router();

// GET /api/admin/stats
OverviewRouter.get('/stats', getStats);
OverviewRouter.get('/top', getDashboardData);
export default OverviewRouter;
