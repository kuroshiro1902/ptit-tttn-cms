const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/category.controller');

// /categories
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/category/:id', categoryController.getPostsByCategory);
categoryRouter.get('/create', categoryController.showCreateCategoryForm);
categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.get('/edit/:id', categoryController.showEditCategoryForm);
categoryRouter.post('/update/:id', categoryController.updateCategory);
categoryRouter.delete('/delete/:id', categoryController.deleteCategory);

module.exports = categoryRouter;
