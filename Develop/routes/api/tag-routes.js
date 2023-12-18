const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [
        {
          model: Product
        },
      ]
    })
    res.status(200).json(tagsData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        },
      ]
    })
    res.status(200).json(tagsData)
  } catch (err) {
    res.status(500).json(err)
  }
});


router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body)
    res.status(201).json(createTag)
  } catch (err) {
    res.status(500).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteTag) {
      res.status(404).json({ message: 'Tag not found!' })
      return
    }

    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
