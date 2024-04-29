const Visiteur = require('../models/visiteur');

const expressAsyncHandler = require('express-async-handler');

exports.createVisiteur = expressAsyncHandler(async (req, res, next) => {
  const visiteur = new Visiteur({
    nom : req.body.nom,
    prenom : req.body.prenom,
    tel : req.body.tel,
    email : req.body.email,unique: true,
    date_embauche : req.body.date_embauche,
    visite : req.body.visite,
  });

  await visiteur.save();

  res.status(201).json({
    message: 'Post saved successfully!'
  });
});

exports.getOneVisiteur = expressAsyncHandler(async (req, res, next) => {
  const visiteur = await Visiteur.findOne({
    _id: req.params.id
  }).populate('porteFeuille');

  if (visiteur) {
    res.status(200).json(visiteur);
  } else {
    res.status(404).json({
      error: 'Visiteur not found'
    });
  }
});

exports.modifyVisiteur = expressAsyncHandler(async (req, res, next) => {
  const visiteur = new Visiteur({
    _id: req.params.id,
    nom : req.body.nom,
    prenom : req.body.prenom,
    tel : req.body.tel,
    email : req.body.email,
    date_embauche : req.body.date_embauche,
    visite : req.body.visite,
  });

  await Visiteur.updateOne({_id: req.params.id}, visiteur);

  res.status(201).json({
    message: 'Visiteur updated successfully!'
  });
});

exports.deleteVisiteur = expressAsyncHandler(async (req, res, next) => {
  await Visiteur.deleteOne({_id: req.params.id});
  res.status(200).json({
    message: 'Deleted!'
  });
});

exports.getAllVisiteurs = expressAsyncHandler(async (req, res, next) => {
  const visiteurs = await Visiteur.find();
  res.status(200).json(visiteurs);
});



exports.addPortfeuille = expressAsyncHandler(async (req, res, next) => {

  const visiteurId = req.params.visiteurId; 
  const praticienId = req.params.praticienId;

  const visiteur = await Visiteur.findById(visiteurId);
  

  if (!visiteurId) {
    return res.status(404).send({ message: 'Visiteur non trouvé' });
  }


  visiteur.porteFeuille.push(praticienId);
  const updatedVisiteur = await visiteur.save();

  res.status(200).json(updatedVisiteur);




});
