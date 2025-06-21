const BaseModel = require('./BaseModel');

class Lesson extends BaseModel {
  static get tableName() {
    return 'lessons';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['class_id', 'title', 'video_url'],
      properties: {
        id: { type: 'integer' },
        class_id: { type: 'integer' },
        title: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        video_url: { type: 'string', format: 'uri' },
        is_published: { type: 'boolean', default: false },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

module.exports = Lesson;
