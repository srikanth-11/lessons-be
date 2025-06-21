module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',         
      password: process.env.DB_PASS,
      database: 'lessons',
    },
    migrations: {
      directory: './migrations',
    },
  },
  production: {
    client: 'pg',
    connection:`postgresql://postgres:${process.env.DB_PASS}@db.pgygpftntvotzyssmrsb.supabase.co:5432/postgres`,
    migrations: {
      directory: './migrations',
    },
  },
};