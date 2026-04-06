const Record = require('../models/Record');

// @desc    Create record
// @route   POST /api/records
// @access  Private/Admin
const createRecord = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const record = await Record.create(req.body);
    
    res.status(201).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all records
// @route   GET /api/records
// @access  Private
const getRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    if (req.query.type) query.type = req.query.type;
    if (req.query.category) query.category = { $regex: req.query.category, $options: 'i' };

    const records = await Record.find(query)
      .populate('createdBy', 'name email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Record.countDocuments(query);

    res.json({
      success: true,
      count: records.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update record
// @route   PUT /api/records/:id
// @access  Private/Admin
const updateRecord = async (req, res) => {
  try {
    let record = await Record.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found'
      });
    }

    record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete record
// @route   DELETE /api/records/:id
// @access  Private/Admin
const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found'
      });
    }

    await Record.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
};

