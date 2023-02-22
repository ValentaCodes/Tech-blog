const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

// This is the '/' homepage endpoint
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['name'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// This allows us to see an individual post and which user posted it along with any comments that post may have
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: User
      }, {
        model: Comment, include: ['user']
      }],
    });
    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


// This allows us to retrieve a users dashboard 
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dashboardData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const dashboard = dashboardData.get({ plain: true });
    res.render('dashboard', {
      ...dashboard,
      logged_in: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// This allows users to access the log in / signup page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;
