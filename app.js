require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const posting = require('./controllers/posting');
const user = require('./controllers/user');
const bodyParser = require('body-parser');
const cors = require('cors');

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
   
app.get('/', posting.helloWorld);

app.post('/user/register', user.create);
app.post('/user/login', user.login);

app.post('/posting', posting.create);
app.get('/posting', posting.read);
 
let port = 4000;
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});