const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

require('dotenv').config();

const visiteurSchema = mongoose.Schema({
  nom: { type: String, required: false },
  prenom: { type: String, required: false },
  tel: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  date_embauche: { type: Date, required: false },
  visite : { type: mongoose.Schema.Types.ObjectId, ref: 'Visite', required: false },
  porteFeuille : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Praticien'}],
});



module.exports = mongoose.model('Visiteur', visiteurSchema);