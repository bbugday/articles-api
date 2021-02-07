const {Router} = require('express');
const articleController = require('../controllers/articleController');
const {requireAuth, checkUser} = require('../middlewares/authMiddleware');

const router = Router();

router.post('/create', requireAuth, checkUser, articleController.article_create);

module.exports = router;