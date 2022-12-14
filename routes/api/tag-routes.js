const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}]
    });
    const tags = tagData.map(tag => tag.get({plain:true}))
    res.status(200).json(tags);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagg = await Tag.findByPk(req.params.id,
      {
        include: Product, through: ProductTag
      });
    if(!tagg){
      res.status(404).json({
        message: "Not found"
      })
      return;
    } 
    res.status(200).json(tagg)
  } catch (err) {
    res.status(404).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagg = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(tagg)
  } catch (err) {
    res.status(404).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagg = await Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}});
    if (!tagg){
      res.status(404).json({message: "Not found"})
      return;
    } else {
      return res.status(200).json(tagg);
    }
  } catch (err) {
    res.status(404).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagg = await Tag.destroy( {where: {id: req.params.id}});
    if (!tagg){
      res.status(404).json({message: "Not found"});
    } else {
      return res.status(200).json(tagg)
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
