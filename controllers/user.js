const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.register = (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {

        let user = new User ({
          email: req.body.email,
          password: hash,
        });

        user.save().then((data) => {
          let payload = { subject: data._id };
          let token = jwt.sign(payload, process.env.JWT_KEY);
          console.log(process.env.JWT_KEY);
          res.send({token});
        }, (err) => {
          res.status(400).send(err);
        });
      });
  });


};

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password

  User.findOne({email: email}).then((data) => {
    if(!data) {
      res.status(401).send('Invalid email');
    } else {
      bcrypt.compare(password, data.password, function(err, result) {
        if(result) {
          let payload = { subject: data._id };
          let token = jwt.sign(payload, process.env.JWT_KEY);
          res.status(200).send({token});
        } else {
          res.status(401).send('Invalid password');
        }
      });
    }

  }, (err) => {
    res.status(400).send(err);
  });
};