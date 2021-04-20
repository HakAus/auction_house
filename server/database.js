const oracledb = require("oracledb");
const pg_pool = require("./pg_database");

// Funciones y stored procedures

// Registro de usuario
const registerUser = async (
  database,
  cedula,
  tipo_usuario,
  alias,
  contrasena,
  nombre,
  primer_apellido,
  segundo_apellido,
  direccion,
  correo,
  estado
) => {
  // Sentencias de las bases de datos.
  const pgQuery =
    "CALL registrar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
  const oracleQuery = `BEGIN
                            casa_subastas.registrar_usuario(:p_cedula, :p_tipo_usuario, :p_alias, :p_contrasena, :p_nombre, :p_primer_apellido, :p_segundo_apellido, :p_direccion, :p_correo, :p_estado);
                       END;`;
  // const test = "SELECT * FROM casa_subastas.usuarios";
  let result;
  let client;

  // Ejecución de la consulta.
  if (database === "pg") client = await pg_pool.connect();
  else client = await oracledb.getConnection();
  try {
    if (database === "pg") {
      result = await client.query(pgQuery, [
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
    } else {
      result = await client.execute(
        oracleQuery,
        {
          p_cedula: cedula,
          p_tipo_usuario: tipo_usuario,
          p_alias: alias,
          p_contrasena: contrasena,
          p_nombre: nombre,
          p_primer_apellido: primer_apellido,
          p_segundo_apellido: segundo_apellido,
          p_direccion: direccion,
          p_correo: correo,
          p_estado: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        },
        { autoCommit: true }
      );
    }
    // console.log(result);
    // Se retorna el estado del procedimiento
    return database === "pg"
      ? result.rows[0].p_estado
      : result.outBinds.p_estado;
  } catch (err) {
    console.error(err.message);
  } finally {
    // Se libera el cliente del pool respectivo
    if (database === "pg") {
      client.release();
    } else {
      client.close();
    }
  }
};

// Se exportan las funciones para cada procedimiento o función
module.exports.registerUser = registerUser;
