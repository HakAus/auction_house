const jwt = require("jsonwebtoken");
require("dotenv").config(); // Da acceso a las variables de entorno

function jwtGenerator(user_id, database) {
  const payload = {
    user: user_id,
    database: database,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "3hr" });
}

module.exports = jwtGenerator;
