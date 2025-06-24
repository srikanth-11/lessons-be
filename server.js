const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const authRoutes = require('./routes/authRoutes');
require('./db');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8000,
    host: process.env.HOST || '0.0.0.0',
  });

  const swaggerOptions = {
    info: {
      title: 'Lessons v1.0 REST API Docs',
      version: Pack.version,
    },
    securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'authorization',
      in: 'header',
    },
  },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.route(userRoutes);
  server.route(lessonRoutes);
  server.route(authRoutes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
  console.log(`📚 Swagger docs at: ${server.info.uri}/documentation`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
