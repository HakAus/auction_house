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
  telefonos,
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
  if (database === process.env.POSTGRES) client = await pg_pool.connect();
  else client = await oracledb.getConnection();
  try {
    if (database === process.env.POSTGRES) {
      await client.query("BEGIN");
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
      for (let i = 0; i < telefonos.length; i++) {
        await client.query("call agregar_telefono($1,$2)", [
          cedula,
          telefonos[i],
        ]);
      }
      await client.query("END;");
    } else {
      // AGREGAR TELEFONOS EN ORACLE
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
      for (let i = 0; i < telefonos.length; i++) {
        await client.execute("BEGIN agregar_telefono(:p_cedula,:p_telefono); END;", {
          p_cedula:cedula,
          p_telefono:telefonos[i],
        },{ autoCommit: true }
        );
      }
    }

    // Se retorna el estado del procedimiento
    return database === process.env.POSTGRES
      ? result.rows[0].p_estado
      : result.outBinds.p_estado;
  } catch (err) {
    console.error(err.message);
  } finally {
    // Se libera el cliente del pool respectivo
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
};

// Se exportan las funciones para cada procedimiento o función
module.exports.registerUser = registerUser;
