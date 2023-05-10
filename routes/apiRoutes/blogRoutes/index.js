const router = require('express').Router();
const { Blog } = require('../../../models');

router.post('/', async (req, res) => {
  try {

    const dbBlogData = await Blog.create({
      ...req.body,
      userId: req.session.user.id, // req.user
    });

    res.json(dbBlogData);
  } catch (error) {
    res.status(500).json({ error });
  }


});


module.exports = router;