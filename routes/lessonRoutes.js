const Joi = require('joi');
const Lesson = require('../models/Lesson');
const authenticateToken = require('../middleware/authMiddleware');

module.exports = [
  {
    method: 'POST',
    path: '/lessons',
    options: {
      description: 'Create a new lesson',
      pre: [{ method: authenticateToken }],
      tags: ['api'],
      plugins: {
      'hapi-swagger': {
        security: [{ jwt: [] }],
      }
    },
      validate: {
        payload: Joi.object({
          class_id: Joi.number().integer().required(),
          title: Joi.string().required(),
          description: Joi.string().optional().allow(null, ''),
          video_url: Joi.string().uri().required(),
          is_published: Joi.boolean().optional(),
        }),
      },
      handler: async (request, h) => {
        const lesson = await Lesson.query().insert(request.payload);
        return h.response(lesson).code(201);
      },
    },
  },
  {
    method: 'GET',
    path: '/lessons',
    options: {
      description: 'Get all lessons',
      pre: [{ method: authenticateToken }],
      tags: ['api'],
      plugins: {
      'hapi-swagger': {
        security: [{ jwt: [] }],
      }
    },
      handler: async () => {
        return await Lesson.query();
      },
    },
  },
  {
    method: 'GET',
    path: '/lessons/{id}',
    options: {
      description: 'Get a lesson by ID',
      pre: [{ method: authenticateToken }],
      tags: ['api'],
      plugins: {
      'hapi-swagger': {
        security: [{ jwt: [] }],
      }
    },
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
      handler: async (request, h) => {
        const lesson = await Lesson.query().findById(request.params.id);
        if (!lesson) {
          return h.response({ error: 'Lesson not found' }).code(404);
        }
        return lesson;
      },
    },
  },
  {
    method: 'PUT',
    path: '/lessons/{id}',
    options: {
      description: 'Update a lesson',
      pre: [{ method: authenticateToken }],
      tags: ['api'],
      plugins: {
      'hapi-swagger': {
        security: [{ jwt: [] }],
      }
    },
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          class_id: Joi.number().integer().optional(),
          title: Joi.string().optional(),
          description: Joi.string().optional().allow(null, ''),
          video_url: Joi.string().uri().optional(),
          is_published: Joi.boolean().optional(),
        }),
      },
      handler: async (request, h) => {
        const updated = await Lesson.query().patchAndFetchById(
          request.params.id,
          request.payload
        );
        if (!updated) {
          return h.response({ error: 'Lesson not found' }).code(404);
        }
        return updated;
      },
    },
  },
  {
    method: 'DELETE',
    path: '/lessons/{id}',
    options: {
      description: 'Delete a lesson',
      pre: [{ method: authenticateToken }],
      tags: ['api'],
      plugins: {
      'hapi-swagger': {
        security: [{ jwt: [] }],
      }
    },
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
      handler: async (request, h) => {
        const deletedRows = await Lesson.query().deleteById(request.params.id);
        if (!deletedRows) {
          return h.response({ error: 'Lesson not found' }).code(404);
        }
        return h.response().code(204);
      },
    },
  },
];
