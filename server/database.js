const Pool = require("pg").Pool;

// Se crea una pileta de conexiones a la base de datos de la casa de subastas
const pool = new Pool({
  user: "pool_user",
  password: "test2021test",
  host: "localhost",
  port: 5432,
  database: "casa_subastas",
});

module.exports = pool;
