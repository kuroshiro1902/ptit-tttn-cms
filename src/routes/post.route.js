const express = require('express');
const postController = require('../controllers/post.controller');
const incrementViewCountMiddleware = require('../middlewares/incrementViewCount.middleware');
const postRouter = express.Router();

// /posts
postRouter.get('/', postController.getAllPosts);
postRouter.get('/detail/:id', incrementViewCountMiddleware, postController.getPostById);
postRouter.get('/create', postController.showCreatePostForm);
postRouter.post('/create', postController.createPost);
postRouter.get('/edit/:id', postController.showEditPostForm);
postRouter.post('/update/:id', postController.updatePost);
postRouter.post('/delete/:id', postController.deletePost);

postRouter.get('/search', postController.searchPosts);

module.exports = postRouter;
