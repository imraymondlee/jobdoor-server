const User = require('../models/user');

exports.create = (req, res) => {
  let user = new User ({
    email: req.body.email,
    password: req.body.password,
  });

  user.save().then((data) => {
    res.send(data);
  }, (err) => {
    res.status(400).send(err);
  });
};

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password


  User.findOne({email: email}).then((data) => {
    if(!data) {
      res.status(401).send('Invalid email');
    } else {
      if(data.password !== password) {
        res.status(401).send('Invalid password');
      } else {
        res.status(200).send(data);
      }
    }

  }, (err) => {
    res.status(400).send(err);
  });
};