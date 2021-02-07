const User = require('../models/User');
const Article = require('../models/Article');

module.exports.article_create = async (req, res) => {
  console.log(res.locals);
  const {title, body} = req.body;
  const user = res.locals.user;
  try{
    const article = await Article.create({title, body, user});
    res.status(201).json();
  } catch(error){
    console.log(error.message);
    //const errors = handleErrors(error);
    res.status(400).json({error});
  }
};