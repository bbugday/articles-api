const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60
  });
};

module.exports.signup_post = async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await User.create({username, password});
    const token = createToken(user._id);
    res.status(201).json({user: {id:user._id, username}, authToken: token});
  } catch(error){
    //const errors = handleErrors(error);
    res.status(400).json({error});
  }
};

module.exports.login_post = async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(201).json({user: {id:user._id, username}, authToken: token});
  } catch(err){
    res.status(400).json({error});
  }
};

module.exports.checkJwt = async (req, res) => {
  const {token} = req.body;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
    if (err) {
      res.status(400).json({error});
    } 
    else {
      try {
        let user = await User.findById(decodedToken.id);
        res.status(201).json({user: {id:user._id, username: user.username}});
      } catch (error) {
        res.status(400).json({error});
      }
    }
  });
};
