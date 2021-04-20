const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");
const express = require("express");

const port = 3000;
const SELECT_ALL_USERS_QUERY = "SELECT * FROM Usuarios";
const app = express();

async function init() {
  try {
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    });
    app.get("/", (req, res) => {
      res.send("go to Usuarios en base de datos");
    });
    app.get("/Test", (req, res) => {
      test();
    });
    app.get("/RegistrarAdmin", (req, res) => {
      registerNewAdmin(req, res);
    });
    app.get("/Usuarios", (req, res) => {
      getUsers(req, res);
    });
    await app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
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

async function test(req, res) {
  let connection;
  try {
    // Get a connection from the default pool
    console.log("TEST");
    connection = await oracledb.getConnection();
    const sql = "INSERT INTO Administradores VALUES(:idno,:nombre,:contrasena)";
    const result = await connection.execute(
      sql,
      {
        idno: 1, // Bind type is determined from the data.  Default direction is BIND_IN
        nombre: "Fernan",
        contrasena: "Bomboclak",
      },
      { autoCommit: true }
    );
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

async function registerNewAdmin(req, res) {
  let connection;
  try {
    console.log("Trying to registerNewAdmin");
    connection = await oracledb.getConnection();
    const sql = "BEGIN REGISTER_NEW_ADMIN(:idno,:nombre,:contrasena); END;";
    const result = await connection.execute(sql, {
      idno: 1, // Bind type is determined from the data.  Default direction is BIND_IN
      nombre: "Fernan",
      contrasena: "Bomboclak",
    });
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

init();
