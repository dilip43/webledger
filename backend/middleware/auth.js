const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Please login to continue' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
};
