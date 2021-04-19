const express = require("express");
const app = express();
const cors = require("cors");
const connectOracleDatabase = require("./oracle_database");

// Conexión a la base de datos de Oracle
connectOracleDatabase();

// Midleware: software intermediario para preparacion o manipulación de solicitudes a la API.

/* Permite acceder a datos obtenidos desde el frontend,
 en particular req.body */
app.use(express.json());
/* Permite al backend interactuar con el frontend */
app.use(cors());

// RUTAS DE LA API //

/* Rutas para inicio de sesion y registro */
app.use("/auth", require("./routes/jwtAuth"));

/* Ruta para el dashboard o menu principal */
app.use("/dashboard", require("./routes/dashboard"));



// Inicia el servidor en el localhost y el puerto dado
app.listen(5000, () => {
  console.log("Server listening on port 5000 ...");
});
