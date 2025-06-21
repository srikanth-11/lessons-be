const Joi = require('joi');
const User = require('../models/User');
const { hashPassword } = require('../utils/auth');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    options: {
      description: 'Get all users',
      tags: ['api'],
      handler: async () => await User.query()
    },
  },
  {
    method: 'POST',
    path: '/users',
    options: {
      description: 'Create a user',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          name: Joi.string().optional(),
        }),
      },
      handler: async (request, h) => {
        const { email, password } = request.payload;

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        const user = await User.query().insert({
          email,
          password: hashedPassword,
        });

        // Return only non-sensitive data
        return h.response({ id: user.id, email: user.email }).code(201);
      },
    },
  },

   {
    method: 'DELETE',
    path: '/users/{id}',
    options: {
      description: 'Delete a user by ID',
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
      handler: async (request, h) => {
        const { id } = request.params;

        const deleted = await User.query().deleteById(id);

        if (!deleted) {
          return h.response({ error: 'User not found' }).code(404);
        }

        return h.response().code(204);
      },
    },
  },
];
