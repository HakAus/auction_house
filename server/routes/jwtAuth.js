const router = require("express").Router();
const pool = require("../database");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

// Error handling
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
const loginErrorHandler = (state, response) => {
  if (state === -1)
    return response
      .status(401)
      .send(
        "Usuario inválido. Acceso denegado. Verifique que haya escrito bien el alias y la contraseña"
      );
};

// Registro
router.post("/register", validInfo, async (req, res) => {
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
    if (procedure.rows._estado !== 1) {
      registerErrorHandler(procedure.rows[0]._estado, res);
    } else {
      // 3. Generar el token jwt
      const token = jwtGenerator(cedula);
      // Enviar el token como respuesta en formato JSON
      res.json({ token });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    // Debe liberarse el cliente para que pueda ser usado en una futura transacción.
    user.release();
  }
});

// Login
router.post("/login", validInfo, async (req, res) => {
  const client = await pool.connect();
  try {
    // 1. Desestrcuturar req.body (alias, contraseña)
    const { alias, contrasena, tipo_usuario } = req.body;

    // 2. Se ejecuta el procedimiento de login
    const queryText = "SELECT * FROM verificar_usuario($1, $2, $3)";
    const procedure = await client.query(queryText, [
      alias,
      contrasena,
      tipo_usuario,
    ]);

    if (procedure.rows[0]._estado !== 1) {
      loginErrorHandler(procedure.rows[0]._estado, res);
    } else {
      // 3. Generar el token
      const token = jwtGenerator(procedure.rows[0]._cedula);
      // Se envía el token como respuesta en formato JSON
      res.json({ token });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

router.get("/is-verified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
