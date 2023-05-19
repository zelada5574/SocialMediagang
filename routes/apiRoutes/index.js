const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/like', likeRoutes);

module.exports = router;