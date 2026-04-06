const express = require('express');
const { body } = require('express-validator');
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

// Admin only
router.post('/', authorizeRoles('admin'), [
  body('amount').isFloat({ min: 0 }),
  body('type').isIn(['income', 'expense']),
  body('category').notEmpty().trim().escape()
], createRecord);

router.put('/:id', authorizeRoles('admin'), [
  body('amount').optional().isFloat({ min: 0 }),
  body('type').optional().isIn(['income', 'expense']),
  body('category').optional().notEmpty().trim().escape()
], updateRecord);

router.delete('/:id', authorizeRoles('admin'), deleteRecord);

// All authenticated users can read
router.get('/', getRecords);

module.exports = router;

