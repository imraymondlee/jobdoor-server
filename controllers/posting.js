const Posting = require('../models/posting');

exports.helloWorld = (req, res) => {
  res.send('Hello World!');
};

exports.create = (req, res) => {
  let posting = new Posting ({
    position: req.body.position,
    company: req.body.company,
    location: req.body.location,
    url: req.body.url,
    datePosted: req.body.datePosted
  });

  posting.save().then((data) => {
    res.send(data);
  }, (err) => {
    res.status(400).send(err);
  });
};

exports.read = (req, res) => {
  Posting.find({}).then((data) => {
    res.send(data);
  }, (err) => {
    res.status(400).send(err);
  });
};