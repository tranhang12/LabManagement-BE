const checkAdmin = (req, res, next) => {
    const isAdmin = req.user.isAdmin;
    if (isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'You do not have access' });
    }
  };
  
  module.exports = checkAdmin;
  