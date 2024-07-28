const express = require('express');
const commentController = require('../controllers/comment.controller');
const commentRouter = express.Router();

commentRouter.post('/create', commentController.createComment);
commentRouter.post('/delete/:id', commentController.deleteComment);

module.exports = commentRouter;