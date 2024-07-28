const Post = require('../models/post');

const incrementViewCountMiddleware = async (req, res, next) => {
  try {
    const postId = req.params.id;
    await Post.increment('view', { where: { id: postId } });
    next();
  } catch (error) {
    console.error('Error incrementing view count:', error);
    next(error);
  }
};

module.exports = incrementViewCountMiddleware;
