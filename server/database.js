const { Pool } = require("pg");

// Se crea una pileta de conexiones
const pool = new Pool();

// Conexion a la base de datos de Postgres

(async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "SELECT autentificar_usuario";
    const res = await client.query(queryText, ["brianc"]);
    const insertPhotoText =
      "INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)";
    const insertPhotoValues = [res.rows[0].id, "s3.bucket.foo"];
    await client.query(insertPhotoText, insertPhotoValues);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    // Debe liberarse el cliente para que pueda ser usado en una futura transacción.
    client.release();
  }
})().catch((e) => console.error(e.stack));
