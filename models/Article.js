const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title']
  },
  body: {
    type: String,
    required: [true, 'Please enter a body'],
    minlength: [20, 'Minimum article length is 20 characters'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl:{
    type: String
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;