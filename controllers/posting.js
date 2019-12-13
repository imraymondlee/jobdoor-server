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
  // Search fields
  let search;
  let position = req.query.position;
  let location = req.query.location;

  // Pagination
  let page = parseInt(req.query.page);
  let size = 3;
  let query = {
    skip: size * (page - 1),
    limit: size
  };


  // Not searching
  if(!position && !location) {
    search = {};
  // Position search
  } else if(position && !location) {
    console.log("Position search");
    search = {
      position: {$regex: position, $options: 'i'}
    };
  // Location search
  } else if (location && !position) {
    console.log("Location search");
    search = {
      location: {$regex: location, $options: 'i'}
    };
  // Position and Location search
  } else {
    console.log("Position and Location search");
    search = {
      "$and": [
        { position: {$regex: position, $options: 'i'} },
        { location: {$regex: location, $options: 'i'} }
      ]
    }
  }

  if(page <= 0) {
    res.status(400).send("Invalid page number");
    return;
  }

  Posting.countDocuments(search, (err, totalCount) => {
    if(err) {
      res.status(400).send(err);
      return;
    }

    Posting.find(search, {}, query).then((data) => {
      let totalPages = Math.ceil(totalCount / size);
      res.send({
        data,
        totalPages
      });
    }, (err) => {
      res.status(400).send(err);
    });
  });
};