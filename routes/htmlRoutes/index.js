const router = require('express').Router();
const { Blog, User } = require('../../models');

// /users
// /users  - render all the users
// /Blogs - renders all the Blogs
// router.get('/', async (req, res) => {
//   try {
//     if (req.session.loggedIn) {
//       res.render('home', {
//         user: req.session.user
//       });
//     }
//   } catch (error) {
//     res.status(500).json({error});
//   }
// });


router.get('/signup', async (req, res) => {
  try {
    const usersData = await User.findAll();
    const users = usersData.map(user => user.get({plain: true}));

    // req.session.save(() => {})

    res.render('signup', {
      sentence: 'This is a sentence',
      users,
      visitCount: req.session.visitCount || 0,
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

    // req.session.save(() => {})

    res.render('login', {
      sentence: 'This is a sentence',
      users,
      visitCount: req.session.visitCount || 0,
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
          }
        ]
      }
    );
    const blogs = blogsData.map(blog => blog.get({plain: true}));

    res.render('home', {
      blogs,
      loggedInUser: req.session.user || null,
    })
  } else {
    res.redirect('/login');
    return;
  }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await User.findByPk(userId, {
      include: [
        {
          model: Blog,
          attributes: ['id', 'content',],
        }
      ]
    });

    const user = userData.get({plain: true});

    res.render('user_profile', {
      user,
    });
  } catch (error) {
    res.status(500).json({error});
  }
});


module.exports = router;