const Visite = require('../models/visite');

const expressAsyncHandler = require('express-async-handler');

exports.createVisite = expressAsyncHandler(async (req, res, next) => {
  const visite = new Visite({
    date_visite: req.body.date_visite,
    commentaire: req.body.commentaire,
    visiteur: req.body.visiteur,
    praticien: req.body.praticien,
    motif: req.body.motif,
  });

  await visite.save();

  res.status(201).json({
    message: 'Post saved successfully!'
  });
});

exports.getOneVisite = expressAsyncHandler(async (req, res, next) => {
  const visite = await Visite.findOne({
    _id: req.params.id
  });

  if (visite) {
    res.status(200).json(visite);
  } else {
    res.status(404).json({
      error: 'Visite not found'
    });
  }
});

exports.modifyVisite = expressAsyncHandler(async (req, res, next) => {
  const visite = new Visite({
    _id: req.params.id,
    date_visite: req.body.date_visite,
    commentaire: req.body.commentaire,
    visiteur: req.body.visiteur,
    praticien: req.body.praticien,
    motif: req.body.motif,
  });

  await Visite.updateOne({_id: req.params.id}, visite);

  res.status(201).json({
    message: 'Visite updated successfully!'
  });
});

exports.deleteVisite = expressAsyncHandler(async (req, res, next) => {
  await Visite.deleteOne({_id: req.params.id});
  res.status(200).json({
    message: 'Deleted!'
  });
});

exports.getAllVisites = expressAsyncHandler(async (req, res, next) => {
  const visites = await Visite.find();
  res.status(200).json(visites);
});