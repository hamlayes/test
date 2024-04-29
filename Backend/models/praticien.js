const mongoose = require('mongoose');

const encrypt = require('mongoose-encryption');

require('dotenv').config();

const praticienSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
  rue: { type: String, required: true },
  code_postale: { type: String, required: true },
  ville: { type: String, required: true },
  visite : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visite', required: false }],
});

module.exports = mongoose.model('Praticien', praticienSchema);