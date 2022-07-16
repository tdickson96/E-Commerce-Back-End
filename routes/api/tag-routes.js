const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
		const tagsData = await Tag.findAll({ include: Product });
		if (!tagsData) {
			res.status(404).json({ message: "--- No tags found ---" });
			return;
		};
		res.status(200).json({ 
      message: "--- Tags found ---",
      data: tagsData
    });
	} catch (err) {
		res.status(500).json({ 
      message: "--- Error finding tags ---",
      error: err 
    });
	};
});

router.get('/:id', async ({ params: { id }}, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // verification regex
  if (!/^[0-9]+$/.test(id)) {
    res.status(400).json({ message: "--- ID has to be a number ---" });
    return;
  };
  try {
		const tagData = await Tag.findByPk(id, { include: Product });
		if (!tagData) {
			res.status(404).json({ message: "--- ID not found ---" });
			return;
		};
		res.status(200).json({ 
      message: "--- Tag ID found ---",
      data: tagData
    });
	} catch (err) {
		res.status(500).json({ 
      message: "--- Error finding tags ---",
      error: err 
    });
	};
});

router.post('/', async ({ body, body: { tag_name} }, res) => {
  // create a new tag
  if (!tag_name) {
    res.status(400).json({ message: "--- Include tag name ---" });
    return;
  };
  try {
    const createTag = await Tag.create(body);
    res.status(200).json({ 
      message: "--- Tag created ---",
      data: createTag
    });
  } catch (err) {
    res.status(500).json({ 
      message: "--- Error finding tag ---",
      error: err 
    });
  };
});

router.put('/:id', async ({ body, body: { tag_name }, params }, res) => {
  // update a tag's name by its `id` value
  if (!tag_name) {
    res.status(400).json({ message: "--- Include tag name ---" });
    return;
  };
  if (!/^[0-9]+$/.test(params.id)) {
    res.status(400).json({ message: "--- ID has to be a number ---" });
    return;
  };
  try {
    const beforeData = await Tag.findByPk(params.id);
    if (tag_name === beforeData.tag_name) {
      res.status(202).json({ message: "--- Tag already exists ---" });
      return;
    };
    await Tag.update(body, { where: { id: params.id } });
    const afterData = await Tag.findByPk(params.id);
    res.status(200).json({ 
      message: "--- Tag updated ---",
      data: afterData
    });
  } catch (err) {
    if (!err.length) {
      res.status(404).json({ message: "--- Tag not updated ---" });
      return;
    };
    res.status(500).json({ 
      message: "--- Error updating tag ---",
      error: err 
    });
  };
});

router.delete('/:id', async ({ params }, res) => {
  // delete on tag by its `id` value
  if (!/^[0-9]+$/.test(params.id)) {
    res.status(400).json({ message: "--- ID has to be a number ---" });
    return;
  };
  try {
    const beforeData = await Tag.findByPk(params.id);
    const deleteTag = await Tag.destroy({ where: { id: params.id } });
    if (!deleteTag) {
      res.status(404).json({ message: "--- Tag not found ---" });
      return;
    }
    res.status(200).json({ 
      message: "--- Tag deleted ---",
      data: beforeData
    });
  } catch (err) {
    res.status(500).json({ 
      message: "--- Error deleting tag ---",
      error: err 
    });
  };
});

module.exports = router;