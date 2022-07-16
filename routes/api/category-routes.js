const router = require('express').Router();
const { request } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll(
      { include: Product }
    );
    if (!categoriesData) {
      res.status(404).json({ message: "--- Categories not found ---" });
      return;
    }
    res.status(200).json({ 
      message: "--- Categories found ---",
      data: categoriesData
    });
  } catch (err) {
    res.status(500).json({ 
      message: "--- Error finding categories ---",
      error: err 
    });
  };
});

router.get('/:id', async ({ params: { id } }, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // verify numbers tags
  if (!/^[0-9]+$/.test(id)) {
    res.status(400).json({ message: "--- ID has to be a number ---" });
    return;
  };
  try {
    const categoryData = await Category.findByPk(
      id, 
      { include: Product }
    );
    if (!categoryData) {
      res.status(404).json({ message: "--- Category not found ---" });
      return;
    }
    res.status(200).json({ 
      message: "--- Category found ---",
      data: categoryData
    });
  } catch (err) {
    res.status(500).json({ 
      message: "--- Error finding categories ---",
      error: err 
    });
  };
});

router.post('/', async ({ body, body: { category_name } }, res) => {
  // create a new category
  if (!category_name) {
    res.status(400).json({ message: "--- Must use letters and must not be empty ---" });
    return;
  };
  try {
    const createCategory = await Category.create(body);
    res.status(200).json({ 
      message: "--- Category created ---",
      data: createCategory
    });
  } catch (err) {
    res.status(500).json({ 
      message: "--- Error creating category---",
      error: err 
    });
  };
});

router.put('/:id', async ({ body, body: { category_name }, params}, res) => {
  // update a category by its `id` value
  if (!category_name) {
    res.status(400).json({ message: "--- Must use letters and must not be empty ---" });
    return;
  };
  // verify regex numbers
  if (!/^[0-9]+$/.test(params.id)) {
    res.status(400).json({ message: "--- ID has to be a number ---" });
    return;
  };
  try {
    const beforeData = await Category.findByPk(params.id);
    if (category_name === beforeData.category_name) {
      res.status(202).json({ message: "--- Category already exists ---" });
      return;
    };
    await Category.update(body, { where: { id: params.id } });
    const afterData = await Category.findByPk(params.id);
    res.status(200).json({ 
      message: "--- Category updated ---",
      data: afterData
    });
  } catch (err) {
    if (!err.length) {
      res.status(404).json({ message: "--- Category not updated ---" });
      return;
    };
    res.status(500).json({ 
      message: "--- Error updating category ---",
      error: err 
    });
  };
});

router.delete('/:id', async ({ params }, res) => {
  // delete a category by its `id` value
  // verify number with regex
  if (!/^[0-9]+$/.test(params.id)) {
    res.status(400).json({ message: "--- ID has to be a number ---" });
    return;
  };
  try {
    const beforeData = await Category.findByPk(params.id);
    const deleteCategory = await Category.destroy({ where: { id: params.id } });
    if (!deleteCategory) {
      res.status(404).json({ message: "--- Category not found ---" });
      return;
    }
    res.status(200).json({ 
      message: "--- Category deleted ---",
      data: beforeData
    });
  } catch (err) {
    res.status(500).json({ 
      message: "--- Error deleting category ---",
      error: err 
    });
  };
});

module.exports = router;