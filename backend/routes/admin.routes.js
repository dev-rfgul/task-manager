import express from 'express';

import { authorizeRoles } from '../middleware/authorizeRole.js';
import { authenticate } from '../middleware/auth.js';

import { getAdminDashboard } from '../controllers/admin.controller.js';

const router = express.Router();

// Admin dashboard route
router.get('/dashboard',authenticate,authorizeRoles('admin') ,getAdminDashboard);

export default router;