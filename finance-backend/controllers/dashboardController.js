const Record = require('../models/Record');

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private/Analyst+
const getDashboardSummary = async (req, res) => {
  try {
    const matchQuery = {};
    if (req.query.startDate || req.query.endDate) {
      matchQuery.date = {};
      if (req.query.startDate) matchQuery.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) matchQuery.date.$lte = new Date(req.query.endDate);
    }

    const result = await Record.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
          totalExpense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } },
          netBalance: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', { $subtract: [0, '$amount'] }]
            }
          },
          categoryTotals: {
            $push: {
              category: '$category',
              type: '$type',
              total: '$amount'
            }
          },
          recentTransactions: { $push: '$$ROOT' }
        }
      },
      {
        $addFields: {
          recentTransactions: { $slice: ['$recentTransactions', 5] }
        }
      },
      {
        $project: {
          _id: 0,
          totalIncome: 1,
          totalExpense: 1,
          netBalance: 1,
          categoryTotals: {
            $arrayToObject: {
              $map: {
                input: { $group: '$categoryTotals' },
                as: 'cat',
                in: ['$$cat.category', { $sum: '$$cat.total' }]
              }
            }
          },
          recentTransactions: 1,
          recordCount: { $size: '$recentTransactions' }
        }
      }
    ]);

    const summary = result[0] || {
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0,
      categoryTotals: {},
      recentTransactions: [],
      recordCount: 0
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardSummary
};

