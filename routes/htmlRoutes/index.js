const router = require('express').Router();
const { Blog, User, Comment, Likes } = require('../../models');


router.get('/', async (req, res) => {
  try {
      res.render('login')
  } catch (error) {
    res.status(500).json({error});
  }
});


router.get('/signup', async (req, res) => {
  try {
    const usersData = await User.findAll();
    const users = usersData.map(user => user.get({plain: true}));

    req.session.save(() => {
      req.session.loggedIn = false;
    })


    res.render('signup', {
      sentence: 'This is a sentence',
      users,
      loggedInUser: req.session.user || null,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
});

router.get('/login', async (req, res) => {
  try {
    const usersData = await User.findAll();
    const users = usersData.map(user => user.get({plain: true}));

    req.session.save(() => {
      req.session.loggedIn = false;
    })

    res.render('login', {
      sentence: 'This is a sentence',
      users,
      loggedInUser: req.session.user || null,
    });


  } catch (error) {
    res.status(500).json({error});
  }
});

router.get('/homepage', async (req, res) => {
  try {
    if (req.session.loggedIn) {
    const blogsData = await Blog.findAll(
      {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ]
      }
    );
    const dbLikeData = await Likes.findAll();

    const likeData = dbLikeData.map(like => like.get({plain: true}));

    const blogs = blogsData.map(blog => blog.get({plain: true}));
    res.render('home', {
      likeData,
      blogs,
      loggedInUser: req.session.user || null,
    })
  } else {
    res.redirect('/login');
  }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get('/users/:userId', async (req, res) => {
  if (req.session.loggedIn) {
  try {
    const { userId } = req.params;
    const userData = await User.findByPk(userId, {
      include: [
        {
          model: Blog,
          attributes: ['id', 'content', 'image', 'createdAt', 'totalLikes'],
        }
      ]
    });

    const user = userData.get({plain: true});

    res.render('user_profile', {
      user,
      loggedInUser: req.session.user || null,
    });
  } catch (error) {
    res.status(500).json({error});
  }
} else {
  res.redirect('/login');
  return;
}
});

router.get('/blogs/:blogId', async (req, res) => {
  try {
    if (req.session.loggedIn) {
    const { blogId } = req.params;
    const blogData = await Blog.findByPk(blogId, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });
    const commentData = await Comment.findAll(
      {
        where: {
          blogId: blogId,
        }
      }
    );
    const comment = commentData.map(comment => comment.get({plain: true}));
    const blog = blogData.get({plain: true});
    res.render('post', {
      comment,
      blog,
      loggedInUser: req.session.user || null,
    })
  } else {
    res.redirect('/login');
    return;
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
});



module.exports = router;