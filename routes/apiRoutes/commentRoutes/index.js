const router = require('express').Router();
const { Comment } = require('../../../models');

router.post('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(400).json({ message: 'You must be logged in to create a comment' });
        }
        const dbCommentData = await Comment.create({
            content: req.body.content,
            userId: req.session.user.id,
            blogId: req.body.blogId,
        });
        res.status(200).json(dbCommentData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;