const router = require('express').Router();
const { request } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories and associated Products
  Category.findAll({
      attributes: [
        'id',
        'category_name'
      ],
      include: [{
        model: Product,
        attributes: ['product_name']
      }]
    })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
      attributes: [
        'id',
        'category_name'
      ],
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        attributes: ['product_name']
      }]
    })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({
          message: 'No Category found with that ID'
        });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// create a new category
router.post('/', (req, res) => {
  Category.create({
      category_name: req.body.category_name
    })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData){
          res.status(404).json({ message: 'No Category found with that ID' });
          return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(categoryData => {
      if(!categoryData){
        res.status(404).json({ message: 'No Category found with that ID' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;