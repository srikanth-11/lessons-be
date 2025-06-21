const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const { JWT_SECRET } = require('../utils/auth');

const authenticateToken = async (request, h) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw Boom.unauthorized('Token not provided');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.auth = { credentials: decoded }; // optional
    return h.continue;
  } catch (err) {
    throw Boom.forbidden('Invalid or expired token');
  }
};

module.exports = authenticateToken;
