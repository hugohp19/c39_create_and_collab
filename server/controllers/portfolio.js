const Portfolio = require('../db/models/portfolio');
mongoose = require('mongoose');

//Creates Portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = await new Portfolio({
      ...req.body,
      employee: req.user._id
    });
    await portfolio.save();
    res.status(200).send(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update all Portfolio
exports.updatePortfolio = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'company',
    'position',
    'typeOfEmployment',
    'dateOfEmployment',
    'location',
    'description',
    'school',
    'schoolDegree',
    'schoolDate',
    'image',
    'video'
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).json({ message: 'invalid updates' });

  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      employee: req.user._id
    });
    if (!portfolio)
      return res.status(404).json({ message: 'Portfolio Data not found :-(' });
    updates.forEach((update) => (portfolio[update] = req.body[update]));
    await portfolio.save();
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPortfolio = async (req, res) => {
  const match = {};

  if (req.query.company) match.company = req.query.company === 'true';
  if (req.query.position) match.position = req.query.position === 'true';
  if (req.query.school) match.school = req.query.school === 'true';
  if (req.query.location) match.location = req.query.location === 'true';
  try {
    await req.user
      .populate({
        path: 'portfolio',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip)
        }
      })
      .execPopulate();
    res.status(200).json(req.user.portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete Portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({
      _id: req.params.id,
      employee: req.user._id
    });
    if (!portfolio)
      return res
        .status(404)
        .json({ message: 'Portfolio Information not found :-(' });
    res
      .status(200)
      .json({ message: 'Portfolio Information has been deleted!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};