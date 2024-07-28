const Post = require('../models/post');
const Category = require('../models/category');
const view = require('../utils/view');
const User = require('../models/user');
const { Op } = require('sequelize');
const Comment = require('../models/comment');

const postView = view('post');

const postController = {
  async index(req, res) {
    const posts = await Post.findAll();
    const categories = await Category.findAll({ attributes: ['id', 'name'] });
    res.render('index', { posts, categories });
  }, 

  async getPostById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: User, as: 'author', attributes: ['name'] },
          { model: Category, as: 'category', attributes: ['id', 'name'] },
          { model: Comment, as: 'comments', include: [{ model: User, as: 'author', attributes: ['id', 'name'] }] }
        ],
      });
      console.log(post);
      res.render(postView('detail'), { post });
    } catch (error) {
      console.log(error);
      res.redirect('/posts')
    }
  },

  async getAllPosts(req, res) {
    const posts = await Post.findAll();
    res.render(postView('index'), { posts });
  },

  // ADMIN

  async showCreatePostForm(req, res) {
    const categories = await Category.findAll();
    res.render(postView('create'), { categories });
  },

  async createPost(req, res) {
    const { title, content, category_id } = req.body;
    const author_id = req.session.user.id; // Lấy user_id từ session
    await Post.create({ title, content, category_id, author_id });
    res.redirect('/posts');
  },

  async showEditPostForm(req, res) {
    const post = await Post.findByPk(req.params.id);
    const categories = await Category.findAll({ attributes: ['id', 'name'] });
    res.render(postView('edit'), { post, categories });
  },

  async updatePost(req, res) {
    const { id } = req.params;
    const { title, content, category_id } = req.body;

    await Post.update(
      { title, content, category_id },
      { where: { id } }
    );

    res.redirect(`/posts/detail/${id}`);
  },

  async deletePost(req, res) {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    res.redirect('/posts');
  },

  async searchPosts(req, res) {
    const { q } = req.query;
    if (!q) {
      return res.render(postView('search'), { posts: [] });
    }

    if (typeof q !== 'string'){
      return res.render(postView('search'), { posts: [] });
    }
    
    try {
      const posts = await Post.findAll({
        where: {
          title: {
            [Op.iLike]: `%${q?.trim()}%`
          }
        },
        include: [
          { model: Category, as: 'category', attributes: ['id', 'name'] },
          { model: User, as: 'author', attributes: ['id', 'name'] }
        ]
      });
      res.render(postView('search'), { posts });
    } catch (error) {
      console.error('Error searching posts:', error);
      res.render(postView('search'), { posts: [] });
    }
  },
};

module.exports = postController;
