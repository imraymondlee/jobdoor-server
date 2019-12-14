const mongoose = require('mongoose');
const { Schema } = mongoose;

const postingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  url: {
    type: String,
  },
  datePosted: {
    type: String,
  }
});

const Posting = mongoose.model('Posting', postingSchema, 'postings');

module.exports = Posting;
