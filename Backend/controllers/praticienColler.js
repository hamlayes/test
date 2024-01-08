const Praticien = require('../models/praticien');

const expressAsyncHandler = require('express-async-handler');

exports.createPraticien = expressAsyncHandler(async (req, res, next) => {
  const praticien = new Praticien({
    nom: req.body.nom,
    prenom: req.body.prenom,
    tel: req.body.tel,
    email: req.body.email,
    adresse: req.body.adresse,
    visite: req.body.visite,
    code_postale: req.body.code_postale,
    rue: req.body.rue,
    ville: req.body.ville,
  });

  await praticien.save();

  res.status(201).json({
    message: 'Praticien created successfully!'
  });
});

exports.getOnePraticien = expressAsyncHandler(async (req, res, next) => {
  const praticien = await Praticien.findOne({
    _id: req.params.id
  });

  if (praticien) {
    res.status(200).json(praticien);
  } else {
    res.status(404).json({
      error: 'Praticien not found'
    });
  }
});

exports.modifyPraticien = expressAsyncHandler(async (req, res, next) => {
  const praticien = new Praticien({
    _id: req.params.id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    tel: req.body.tel,
    email: req.body.email,
    adresse: req.body.adresse,
    visite: req.body.visite,
    code_postale: req.body.code_postale,
    rue: req.body.rue,
    ville: req.body.ville,
  });

  await Praticien.updateOne({_id: req.params.id}, praticien);

  res.status(201).json({
    message: 'Praticien updated successfully!'
  });
});

exports.deletePraticien = expressAsyncHandler(async (req, res, next) => {
  await Praticien.deleteOne({_id: req.params.id});
  res.status(200).json({
    message: 'Praticien deleted!'
  });
});

exports.getAllPraticiens = expressAsyncHandler(async (req, res, next) => {
  const praticiens = await Praticien.find();
  res.status(200).json(praticiens);
});