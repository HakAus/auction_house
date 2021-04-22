const router = require("express").Router();
const pg_pool = require("../pg_database");
const { connectDatabase, registerUser } = require("../database");
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
  if (state === -1) {
    console.log("Usuario inváldio");
    return response
      .status(401)
      .send(
        "Usuario inválido. Acceso denegado. Verifique que haya escrito bien el alias y la contraseña"
      );
  }
};

// Registro
router.post("/register", validInfo, async (req, res) => {
  try {
    // 1. Desestrcuturar req.body (alias, contraseña)
    const {
      // base_de_datos,
      cedula,
      tipo_usuario,
      alias,
      contrasena,
      nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      correo,
      telefonos,
      estado,
    } = req.body;

    // 2. Se hace el registro del usuario en la base de datos por medio de una tranasacción.

    const procedure_status = await registerUser(
      /*base_de_datos,*/ "pg",
      cedula,
      tipo_usuario,
      alias,
      contrasena,
      nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      correo,
      telefonos,
      estado
    );

    // 2. Verificar si existe el usuario (si no, mandar error)
    if (procedure_status === 1) {
      console.log("Registro existoso");
      // 3. Generar el token jwt
      const token = jwtGenerator(cedula);
      // Enviar el token como respuesta en formato JSON
      res.json({ token });
    } else {
      registerErrorHandler(procedure_status, res);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

// Login
router.post("/login", validInfo, async (req, res) => {
  const client = await pg_pool.connect();
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
