const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'your-secret-key';

// Render doctor registration view
exports.renderDoctorRegister = (req, res) => {
  res.render('doctorRegister');
};

// Handle doctor registration form submission
exports.registerDoctor = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if a doctor with the same username already exists
    const existingDoctor = await Doctor.findOne({ username });

    if (existingDoctor) {
      //return res.status(400).send('Doctor with the same username already exists.');
      req.flash('error', 'User is already registered');

      return res.redirect('back');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ username, password: hashedPassword });
    await doctor.save();
    res.status(201).send('Doctor registered successfully.');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Render doctor login view
exports.renderDoctorLogin = (req, res) => {
  res.render('doctorLogin');
};

// Handle doctor login form submission
exports.loginDoctor = async (req, res) => {
  const { username, password } = req.body;
  const doctor = await Doctor.findOne({ username });

  if (!doctor) {
   // return res.status(400).send('Doctor not found.');
   req.flash('error', 'Doctor not found');

      return res.redirect('back');
  }

  const validPassword = await bcrypt.compare(password, doctor.password);
  if (!validPassword) {
    //return res.status(400).send('Invalid password.');
    req.flash('error', 'Invalid password.');

      return res.redirect('back');
  }

  const token = jwt.sign({ _id: doctor._id, username: doctor.username }, secretKey);
  res.send(token);
};
