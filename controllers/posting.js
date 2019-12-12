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
  let pageNum = parseInt(req.query.pageNum);
  let size = parseInt(req.query.size);
  let query = {
    skip: size * (pageNum - 1),
    limit: size
  };

  if(pageNum <= 0) {
    res.status(400).send("Invalid page number");
    return;
  }

  Posting.find({}, {}, query).then((data) => {
    res.send(data);
  }, (err) => {
    res.status(400).send(err);
  });
};