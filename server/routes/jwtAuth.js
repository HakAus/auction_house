const router = require("express").Router();
const pool = require("../database");

// Registro
const registerErrorHandler = (state, response) => {
  switch (state) {
    case -1:
      console.log("El tipo de usuario no existe");
      break;
    case -2:
      console.log("La cedula ingresada ya existe");
      return response.status(401).send("El usuario ya existe");
    case -3:
      console.log("Verifique la longitud de los datos ingresados");
      break;
    case -4:
      console.log("Verifique el formato del alias ingresado");
      break;
    case -5:
      console.log("Verifique el formato de la contraseña ingresada");
      break;
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
    if (procedure.rows._estado == 1) {
      console.log("todo good");
    } else {
      registerErrorHandler(procedure.rows[0]._estado, res);
    }
    // 3. Ingresar al nuevo usuario en la base de datos
    // 4. Generar el token jwt
  } catch (e) {
    console.log("El registro falló");
    throw e;
  } finally {
    // Debe liberarse el cliente para que pueda ser usado en una futura transacción.
    user.release();
  }
});

module.exports = router;
