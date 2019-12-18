const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  let user = new User ({
    email: req.body.email,
    password: req.body.password,
  });

  user.save().then((data) => {
    let payload = { subject: data._id };
    let token = jwt.sign(payload, process.env.JWT_KEY);
    console.log(process.env.JWT_KEY);
    res.send({token});
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
        let payload = { subject: data._id };
        let token = jwt.sign(payload, process.env.JWT_KEY);
        res.status(200).send({token});
      }
    }

  }, (err) => {
    res.status(400).send(err);
  });
};