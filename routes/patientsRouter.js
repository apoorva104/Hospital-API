const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');

// Patient registration view
router.get('/register', (req, res) => {
  res.render('patientRegister');
});

// Handle patient registration form submission
router.post('/register', patientsController.registerPatient);

// Create patient report route
router.post('/create_report/:id', patientsController.createReport);

// Get all reports of a patient route
router.get('/all_reports/:id', patientsController.getAllReports);

module.exports = router;
