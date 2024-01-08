const Thing = require('../models/thing');

const expressAsyncHandler = require('express-async-handler');

exports.createThing = expressAsyncHandler(async (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });

  await thing.save();

  res.status(201).json({
    message: 'Post saved successfully!'
  });
});

exports.getOneThing = expressAsyncHandler(async (req, res, next) => {
  const thing = await Thing.findOne({
    _id: req.params.id
  });

  if (thing) {
    res.status(200).json(thing);
  } else {
    res.status(404).json({
      error: 'Thing not found'
    });
  }
});

exports.modifyThing = expressAsyncHandler(async (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });

  await Thing.updateOne({_id: req.params.id}, thing);

  res.status(201).json({
    message: 'Thing updated successfully!'
  });
});

exports.deleteThing = expressAsyncHandler(async (req, res, next) => {
  await Thing.deleteOne({_id: req.params.id});
  res.status(200).json({
    message: 'Deleted!'
  });
});

exports.getAllStuff = expressAsyncHandler(async (req, res, next) => {
  const things = await Thing.find();
  res.status(200).json(things);
});