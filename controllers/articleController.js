const Article = require('../models/Article');

module.exports.article_create = async (req, res) => {
  const {title, body, imageUrl} = req.body;
  const user = res.locals.user;
  try{
    const article = await Article.create({title, body, user, imageUrl});
    res.status(201).json();
  } catch(error){
    console.log(error.message);
    //const errors = handleErrors(error);
    res.status(400).json({error});
  }
};

module.exports.article_list = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(200).json({message: err.message});
  }
};

module.exports.article_detail = async (req, res) => {
  res.status(200).json(res.article);
};


