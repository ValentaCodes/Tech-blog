const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// this is the /post endpoint
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }],
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const newPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
