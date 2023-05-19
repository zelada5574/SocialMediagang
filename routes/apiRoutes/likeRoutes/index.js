const router = require('express').Router();
const { Blog, Comment, Likes, User } = require('../../../models');

router.get('/get/:id', async (req, res) => {
    try {
        const dbLikeData = await Likes.findAll({
            where: {
                likedBlogId: req.params.id,
                userLikedId: req.session.user.id,
            }
        });
        console.log(dbLikeData);
        res.json(dbLikeData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/dislike/:id', async (req, res) => {
    try {
        const dbLikeData = await Likes.destroy({
            where: {
                likedBlogId: req.params.id,
                userLikedId: req.session.user.id,
            }
        });
        const dbBlogData = await Blog.update({
            totalLikes: req.body.likes,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json({ message: 'You unliked the blog post' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const dbLikeData = await Likes.create({
            likedBlogId: req.params.id,
            userLikedId: req.session.user.id,
            isLiked: req.body.isLiked,
        });
        const dbBlogData = await Blog.update({
            totalLikes: req.body.likes,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.json(dbBlogData);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;