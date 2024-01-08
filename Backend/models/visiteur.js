const mongoose = require('mongoose');

const visiteurSchema = mongoose.Schema({
  nom: { type: String, required: false },
  prenom: { type: String, required: false },
  tel: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date_embauche: { type: Date, required: false},
  visite : { type: mongoose.Schema.Types.ObjectId, ref: 'Visite', required: false },
});

module.exports = mongoose.model('Visiteur', visiteurSchema);