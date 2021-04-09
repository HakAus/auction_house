const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
const express = require('express');

const port = 3000;
const SELECT_ALL_USERS_QUERY = 'SELECT * FROM Usuarios';
const app = express();

async function init() {
  try {
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    });
	app.get('/', (req, res) => {
	  res.send('go to Usuarios en base de datos');
	})

	app.get('/Usuarios', (req, res) => {
		getUsers(req, res);
	})
    await app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
	});
  } catch (err) {
    console.error("init() error: " + err.message);
  }
}

async function getUsers(req, res) {
  let connection;
  try {
    // Get a connection from the default pool
    console.log("Trying to get users");
    connection = await oracledb.getConnection();
    const sql = SELECT_ALL_USERS_QUERY;
    const binds = [1];
    const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    const result = await connection.execute(sql);
    res.send(result.rows[0]);
    // oracledb.getPool()._logStats(); // show pool statistics.  _enableStats must be true
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      try {
        // Put the connection back in the pool
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}


init();