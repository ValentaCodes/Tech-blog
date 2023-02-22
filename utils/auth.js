const withAuth = (req, res, next) => {
  // checks to see if user is logged in
  !req.session.logged_in ? res.redirect('/login') : next();
};

module.exports = withAuth