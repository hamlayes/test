const mongoose = require('mongoose');

const visiteSchema = mongoose.Schema({
  date_visite: { type: String, required: true },
  commentaire: { type: String, required: true },
  visiteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Visiteur', required: true },
  praticien: { type: mongoose.Schema.Types.ObjectId, ref: 'Praticien', required: true },
  motif: { type: mongoose.Schema.Types.ObjectId, ref: 'Motif', required: true },
});

module.exports = mongoose.model('Visite', visiteSchema);