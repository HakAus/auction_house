const router = require("express").Router();
const pool = require("../database");
const jwtGenerator = require("../utils/jwtGenerator");

// Registro
const registerErrorHandler = (state, response) => {
  switch (state) {
    case -1:
      return response.status(409).send("El tipo de usuario no existe");
    case -2:
      return response.status(401).send("El usuario ya existe");
    case -3:
      return response
        .status(409)
        .send("Verifique la longitud de los datos ingresados");
    case -4:
      return response
        .status(409)
        .send("Verifique el formato del alias ingresado");
    case -5:
      return response
        .status(409)
        .send("Verifique el formato de la contraseña ingresada");
    default:
      break;
  }
};

router.post("/register", async (req, res) => {
  const user = await pool.connect();
  try {
    // 1. Desestrcuturar req.body (alias, contraseña)
    const {
      cedula,
      tipo_usuario,
      alias,
      contrasena,
      nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      correo,
      estado,
    } = req.body;

    console.log(req.body);
    // 2. Se hace el registro del usuario en la base de datos por medio de una tranasacción.
    const queryText =
      "CALL registrar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const procedure = await user.query(queryText, [
      cedula,
      tipo_usuario,
      alias,
      contrasena,
      nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      correo,
      estado,
    ]);
    // 2. Verificar si existe el usuario (si no, mandar error)
    if (procedure.rows._estado != 1) {
      registerErrorHandler(procedure.rows[0]._estado, res);
    }
    // 3. Generar el token jwt
    const token = jwtGenerator(cedula);
    res.json({ token }); // Envia una respuesta en formato JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    // Debe liberarse el cliente para que pueda ser usado en una futura transacción.
    user.release();
  }
});

module.exports = router;
