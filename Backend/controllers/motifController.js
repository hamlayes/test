const Motif = require('../models/motif');

const expressAsyncHandler = require('express-async-handler');

exports.createMotif = expressAsyncHandler(async (req, res, next) => {
  const motif = new Motif({
    libelle: req.body.libelle
    
  });

  await motif.save();

  res.status(201).json({
    message: 'Post saved successfully!'
  });
});

exports.getOneMotif = expressAsyncHandler(async (req, res, next) => {
  const motif = await Motif.findOne({
    _id: req.params.id
  });

  if (motif) {
    res.status(200).json(motif);
  } else {
    res.status(404).json({
      error: 'Motif not found'
    });
  }
});

exports.modifyMotif = expressAsyncHandler(async (req, res, next) => {
  const motif = new Motif({
    libelle: req.body.libelle
  });

  await Motif.updateOne({_id: req.params.id}, motif);

  res.status(201).json({
    message: 'Motif updated successfully!'
  });
});

exports.deleteMotif = expressAsyncHandler(async (req, res, next) => {
  await Motif.deleteOne({_id: req.params.id});
  res.status(200).json({
    message: 'Deleted!'
  });
});

exports.getAllMotifs = expressAsyncHandler(async (req, res, next) => {
  const motifs = await Motif.find();
  res.status(200).json(motifs);
});