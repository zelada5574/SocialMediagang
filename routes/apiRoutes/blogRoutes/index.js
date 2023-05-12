const router = require('express').Router();
const { Blog } = require('../../../models');

router.post('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.create({
      content: req.body.content,
      userId: req.session.user.id, 
    });

    res.json(dbBlogData);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/', (req, res) => {
  // Get the file that was set to our field named "image"
  const { image } = req.files;

  console.log(req.files);



  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  image.mv(__dirname  + '/images/' + image.name);

  // Send response
  res.sendStatus(200);
});

module.exports = router;