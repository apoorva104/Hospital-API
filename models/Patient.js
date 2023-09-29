const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  phoneNumber: String,
  // Add other patient fields as needed
});

module.exports = mongoose.model('Patient', patientSchema);
