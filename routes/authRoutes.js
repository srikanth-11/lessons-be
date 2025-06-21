const Joi = require('joi');
const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    options: {
      description: 'Register a new user',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        }),
      },
      handler: async (request, h) => {
        const { name, email, password } = request.payload;

        const existing = await User.query().findOne({ email });
        if (existing) {
          return h.response({ error: 'Email already exists' }).code(409);
        }

        const hashed = await hashPassword(password);
        const user = await User.query().insert({ name, email, password: hashed });

        return h
          .response({ id: user.id, email: user.email })
          .code(201);
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/login',
    options: {
      description: 'Login a user and get JWT',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
      handler: async (request, h) => {
        const { email, password } = request.payload;

        const user = await User.query().findOne({ email });
        if (!user) {
          return h.response({ error: 'Invalid credentials' }).code(401);
        }

        const valid = await comparePassword(password, user.password);
        if (!valid) {
          return h.response({ error: 'Invalid credentials' }).code(401);
        }

        const token = generateToken(user);
        return { token };
      },
    },
  },
];
