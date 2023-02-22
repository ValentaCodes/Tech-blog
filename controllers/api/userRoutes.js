const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// this is the '/api/user' endpoint

// This post will create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Allows a user to login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userData) {
      res.status(400).json({ message: 'incorrect email or password' });
      return;
    }
    const validPass = userData.checkPassword(req.body.password);
    if (!validPass) {
      res.status().json({ message: 'incorrect email or password, try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: `Welcome back!` });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// allows a user to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// finds all users in DB with their posts and comments
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{model: Post}, {model: Comment}]
    })
    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router;
