const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  status: { type: String, enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'] },
  patientsId:String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
