const express = require('express');
const { getDashboardSummary } = require('../controllers/dashboardController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles('analyst', 'admin'));

router.get('/summary', getDashboardSummary);

module.exports = router;

