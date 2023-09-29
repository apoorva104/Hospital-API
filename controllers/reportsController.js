const Report = require('../models/Report');

// Render report listing view
exports.renderReportList = async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: 'asc' });
    res.render('reportList', { reports });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
