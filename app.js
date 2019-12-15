require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const posting = require('./controllers/posting');
const user = require('./controllers/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }).then(()=>{
    console.log("Connected to database")
  }, (err) => {
    console.log("Error: ", err);
  }
);

// Token Middleware 
verifyToken = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey123');
  if(!payload) {
    return res.status(401).send('Unauthorized request');
  }
  // Grab user ID from the payload
  req.userId = payload.subject;
  next();
}
   
app.get('/', posting.helloWorld);

app.post('/user/register', user.register);
app.post('/user/login', user.login);

app.post('/posting', verifyToken, posting.create);
app.get('/posting', posting.read);

app.get('/posting/single/:id', verifyToken, posting.readSingle);

app.get('/posting/my-postings', verifyToken, posting.myPostings);
 
let port = 4000;
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});