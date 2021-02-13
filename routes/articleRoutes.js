const {Router} = require('express');
const articleController = require('../controllers/articleController');
const {requireAuth, checkUser} = require('../middlewares/authMiddleware');
const {getArticle} = require('../middlewares/articleMiddleware');

const router = Router();

router.get('/', articleController.article_list);
router.post('/create', requireAuth, checkUser, articleController.article_create);
router.get('/:id', getArticle, articleController.article_detail);


module.exports = router;