const postController = require('../controllers/post.controller');
const authRouter = require('./auth.route');
const categoryRouter = require('./category.route');
const commentRouter = require('./comment.route');
const postRouter = require('./post.route');

const router = require('express').Router();

// Hiển thị danh sách bài viết
router.get('/', postController.index);

router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/categories', categoryRouter);
router.use('/comments', commentRouter);

module.exports = router;
