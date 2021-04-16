const express = require("express");
const app = express();
const cors = require("cors");

// Midleware: software intermediario para preparacion o manipulación de solicitudes a la API.

/* Permite acceder a datos obtenidos desde el frontend,
 en particular req.body */
app.use(express.json());
// Permite al backend interactuar con el frontend
app.use(cors());

// RUTAS DE LA API //

// Inicia el servidor en el localhost y el puerto dado
app.listen(5000, () => {
  console.log("Server listening on port 5000 ...");
});
