const logger = require('morgan');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//db
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_KEY, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(authRoutes);
app.use('/articles', articleRoutes);

app.listen(8080, () => console.log('Server Started'));