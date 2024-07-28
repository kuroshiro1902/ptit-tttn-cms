const Category = require('../models/category');
const Post = require('../models/post');
const User = require('../models/user');
const view = require('../utils/view');

const categoryView = view('category');


const categoryController = {
  async getAllCategories(req, res) {
    const categories = await Category.findAll({ attributes: ['id', 'name'] });
    res.render(categoryView('index'), { categories });
  },

  async getPostsByCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send('Category not found');
      }

      const posts = await Post.findAll({
        where: { category_id: req.params.id },
        include: [
          { model: User, as: 'author', attributes: ['id', 'name'] }
        ]
      });

      res.render(categoryView('category-posts'), { category, posts });
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  async showCreateCategoryForm(req, res) {
    const categories = await Category.findAll();
    res.render(categoryView('create'), { categories });
  },

  async createCategory(req, res) {
    const { name } = req.body;
    await Category.create({ name });
    res.redirect('/categories'); // Chuyển hướng về danh sách categories sau khi tạo mới
  },

  async showEditCategoryForm(req, res) {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.render('category/edit', { category });
    } else {
      res.redirect('/categories');
    }
  },

  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (category) {
      await category.update({ name });
    }
    res.redirect('/categories');
  },

  async deleteCategory(req, res) {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(200).send({ message: 'Xóa thành công' });
    } else {
      res.status(404).send({ message: 'Không tìm thấy thể loại' });
    }
  }
};

module.exports = categoryController;
