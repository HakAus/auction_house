const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("No autorizado");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
    req.database = payload.database;
  } catch (err) {
    console.error("Error message:", err.message);
    return res.status(403).json("No autorizado");
  }

  next(); // Para continuar con las siguientes partes del middleware
};
