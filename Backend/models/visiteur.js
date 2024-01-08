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
});

const secret = 'some secret string'; // Remplacez ceci par votre propre clé secrète
visiteurSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['nom','prenom','tel'] });

module.exports = mongoose.model('Visiteur', visiteurSchema);