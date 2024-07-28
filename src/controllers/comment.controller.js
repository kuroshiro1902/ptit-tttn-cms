const Comment = require('../models/comment');

const commentController = {
  async createComment(req, res) {
    const { content, post_id } = req.body;
    await Comment.create({ content, post_id, author_id: req.session.user.id });
    res.redirect(`/posts/detail/${post_id}`);
  },

  async deleteComment(req, res) {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    const post_id = comment.post_id;
    await comment.destroy();
    res.redirect(`/posts/detail/${post_id}`);
  }
};

module.exports = commentController;