const Patient = require('../models/Patient');
const Report = require('../models/Report');

// Render patient registration view
exports.renderPatientRegister = (req, res) => {
  res.render('patientRegister');
};

// Handle patient registration form submission
exports.registerPatient = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    let patient = await Patient.findOne({ phoneNumber });

    if (!patient) {
      patient = new Patient({ phoneNumber });
      await patient.save();
    }

    res.status(201).json(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Handle create patient report form submission
exports.createReport = async (req, res) => {
  try {
    const  patientsId  = req.params['id'];
    console.log(patientsId);
    const { status } = req.body;
    const createdBy = req.body.user._id;
    const report = new Report({ createdBy, status,patientsId });
    await report.save();

    res.status(201).json(report);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get all reports of a patient
exports.getAllReports = async (req, res) => {
  try {
    const { id } = req.params;
    const reports = await Report.find({ patientsId: id });

    res.status(200).json(reports);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
