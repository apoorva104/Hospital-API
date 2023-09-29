const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Callback function for handling '/reports' GET request
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: 'asc' });
    res.render('reportList', { reports });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
