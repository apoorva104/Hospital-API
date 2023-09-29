const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');
// Doctor registration view
router.get('/register', (req, res) => {
  console.log("dfghj")

  res.render('doctorRegister');
});

// Handle doctor registration form submission
router.post('/register', doctorsController.registerDoctor);

// Doctor login view
router.get('/login', (req, res) => {
  res.render('doctorLogin');
});

// Handle doctor login form submission
router.post('/login', doctorsController.loginDoctor);

module.exports = router;
