const oracledb = require("oracledb");
const pg_pool = require("./pg_database");
// const oracle_pool = require("./oracle_database");

// let client;
// const connectDatabase = async (database) => {
//   if (database == "pg") {
//     console.log("Conectando a postgres");
//     const cosa = await pg_pool.connect();
//     console.log();
//   } else {
//     const cosa = await oracle_pool.getConnection();
//   }
// };

// Stored procedures and functions

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
  const pgQuery =
    "CALL registrar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
  const oracleQuery = `BEGIN
                            registrar_usuario(:p_cedula, :p_tipo_usuario, :p_alias, :p_contrasena, :p_nombre, :p_primer_apellido, :p_segundo_apellido, :p_direccion, :p_correo, :p_estado);
                       END;`;
  let result;
  const pg_client = await pg_pool.connect();
  await oracledb.initOracleClient({
    libDir: "/Users/austinedwardhakansonhidalgo/Downloads/instantclient_19_8",
  });
  await oracledb.createPool({
    user: "system",
    password: "admin",
    connectString: "localhost/auction_pdb",
  });
  const oracle_client = await oracledb.getConnection();
  try {
    if (database === "pg") {
      result = await pg_client.query(pgQuery, [
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
      result = await oracle_client.execute(oracleQuery, {
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
      });
    }
    console.log(result.outBinds);
    // console.log("Resultado del registro es: ", result.rows[0].p_estado);
    return result.outBinds /*result.rows[0].p_estado*/;
  } catch (err) {
    console.error(err.message);
  } finally {
    if (database === "pg") {
      client.release();
    } else {
      oracle_client.close();
    }
  }
};

// module.exports.connectDatabase = connectDatabase;
module.exports.registerUser = registerUser;
