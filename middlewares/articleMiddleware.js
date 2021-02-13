const Article = require('../models/Article');

const getArticle = async (req, res, next) => {
  let article;
  try{
    article = await Article.findById(req.params.id).populate('user');
    if(article == null){
      return res.status(404).json({ message: 'Can not find article'});
    }
  } catch(err){
    return res.status(500).json({message: err.message});
  }
  res.article = article;
  next();  
};

module.exports = {getArticle};