const router = require("express").Router();
const oracledb = require("oracledb");
const pool = require("../pg_database");
const authorization = require("../middleware/authorization");
const OracleDB = require("oracledb");

let database;

router.get("/obtenerAliasTipoUsuario", authorization, async (req, res) => {
  let client;
  database = req.database;
  try {
    if (database === "pg") {
      client = await pool.connect();
    } else {
      client = await oracledb.getConnection();
    }
    // Del middleware "authorization" obtenemos el id del usuario validado (la cedula)
    let procedure;
    const queryText = "SELECT * FROM obtener_alias_y_tipo_usuario($1)";
    const oracleQuery =
      "BEGIN  casa_subastas.obtener_info_usuario(:pcedula,:ret);  END;";
    if (database === "pg")
      procedure = await client.query(queryText, [req.user]);
    else {
      const oracleProcedure = await client.execute(oracleQuery, {
        pcedula: req.user,
        ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
      });
      const resultSet = oracleProcedure.outBinds.ret;
      //Clase para que coincida con postgres
      class rowa {
        constructor(alias, tipo, cedula) {
          this.alias = alias;
          this.tipousuario = tipo;
          this.cedula = cedula;
        }
      }
      procedure = { rows: [] };
      let row;
      while ((row = await resultSet.getRow())) {
        procedure.rows.push(new rowa(row[0], row[1], req.user));
      }

      // always close the ResultSet
      await resultSet.close();
    }
    res.json(procedure.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

router.post("/obtenerInfoCompletaUsuario", authorization, async (req, res) => {
  database = req.database;
  // Arreglo para almacenar los telefonos del usuario
  let phoneNumbers = [];

  const client = await pool.connect();
  try {
    // Del middleware "authorization" obtenemos el id del usuario validado (la cedula)
    await client.query("BEGIN");

    const queryGetUserData = "SELECT * FROM obtener_info_completa_usuario($1)";
    const queryGetUserPhoneNumbers =
      "SELECT * FROM obtener_telefonos_usuario($1)";
    const user_info = await client.query(queryGetUserData, [req.body.cedula]);
    const user_phone_numbers = await client.query(queryGetUserPhoneNumbers, [
      req.body.cedula,
    ]);
    for (let i = 0; i < user_phone_numbers.rows.length; i++) {
      phoneNumbers.push(user_phone_numbers.rows[i].telefono);
    }
    user_info.rows[0].telefonos = phoneNumbers;
    await client.query("END;");
    res.json(user_info.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

//Metodo para traer todos los items que estan en la base de datos
router.post("/getAuctions", authorization, async (req, res) => {
  database = req.database;
  let client;

  console.log("Getting auctions");
  try {
    if (database === "pg") client = await pool.connect();
    else {
      client = await oracledb.getConnection();
    }
    const queryText = "SELECT * FROM obtener_subastas()";
    const oracleQuery = "BEGIN  casa_subastas.obtener_subastas(:ret);  END;";
    let procedure;
    if (database === "pg") procedure = await client.query(queryText);
    else {
      let oracleProcedure = await client.execute(oracleQuery, {
        ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
      });
      const resultSet = oracleProcedure.outBinds.ret;
      class rowa {
        constructor(
          idsubcategoria,
          idsubasta,
          descripcion,
          fechaDeCierre,
          preciobase,
          imagen,
          detallesdeentrega
        ) {
          this.idsubcategoria = idsubcategoria;
          this.idsubasta = idsubasta;
          this.fechaDeCierre = fechaDeCierre;
          this.descripcion = descripcion;
          this.preciobase = preciobase;
          this.imagen = imagen;
          this.detallesdeentrega = detallesdeentrega;
        }
      }
      procedure = { rows: [] };
      let row;
      while ((row = await resultSet.getRow())) {
        //console.log(row)
        procedure.rows.push(
          new rowa(row[0], row[1], row[2], row[3], row[4], row[5], row[6])
        );
      }
      await resultSet.close(); //Cierre de conexion y result set
    }
    res.json(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

// Método para traer las categorías
router.post("/getCategories", authorization, async (req, res) => {
  database = req.database;
  const client = await pool.connect();
  console.log("Getting categories");
  try {
    const queryText = "SELECT * FROM obtener_categorias()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
  } catch (err) {
    console.error("ERORR GETTING THE CATEGORIES", err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

// Método para traer las subcategorías
router.post("/getSubcategories", authorization, async (req, res) => {
  database = req.database;
  const client = await pool.connect();
  console.log("Getting subcategories");
  try {
    const queryText = "SELECT * FROM obtener_subcategorias()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
  } catch (err) {
    console.error("ERORR GETTING THE SUBCATEGORIES", err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

// Método para agregar una subasta
router.post("/addAuction", authorization, async (req, res) => {
  database = req.database;
  // Se desestructura el body
  const {
    sellerAlias,
    subcategoryId,
    description,
    basePrice,
    date,
    time,
    image,
    deliveryDetails,
  } = req.body;
  const datetime = date + " " + time;
  // Se hace la llamada a la base de datos
  const client = await pool.connect();
  console.log("Adding auction");
  console.log("Datos de la subasta a agregar (server):", req.body);
  try {
    const createItemQuery = "select * from crear_item($1, $2, $3, $4)";
    const createAuctionText = "call crear_subasta($1, $2, $3, $4)";
    console.log(
      "Para meter en crear item:",
      subcategoryId,
      basePrice,
      description,
      image
    );
    const itemId = await client.query(createItemQuery, [
      subcategoryId,
      basePrice,
      description,
      image,
    ]);

    await client.query("BEGIN");
    console.log(
      "Para meter en crear subastas: ",
      itemId.rows[0].crear_item,
      sellerAlias,
      datetime,
      deliveryDetails
    );
    await client.query(createAuctionText, [
      itemId.rows[0].crear_item,
      sellerAlias,
      datetime,
      deliveryDetails,
    ]);
    await client.query("END;");

    res.json("Subasta agregada correctamente");
  } catch (err) {
    console.error("ERORR ADDING THE AUCTION", err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

router.post("/getBids", authorization, async (req, res) => {
  database = req.database;
  const { idsubasta } = req.body;
  let client;
  let procedure;

  console.log("Getting bids");
  try {
    if (database === "pg") client = await pool.connect();
    else client = await oracledb.getConnection();
    const queryText = "select * from obtener_pujas_para_subastas($1)";
    const oracleQuery =
      "BEGIN  casa_subastas.obtener_pujas_para_subastas(:pidsubasta,:ret);  END;";
    if (database == "pg")
      procedure = await client.query(queryText, [idsubasta]);
    else {
      console.log(req.body);
      let oracleProcedure = await client.execute(oracleQuery, {
        pidsubasta: idsubasta,
        ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
      });
      const resultSet = oracleProcedure.outBinds.ret;
      class rowa {
        constructor(p_ifoferta, p_id_ofertante, p_monto, p_fecha_tiempo) {
          this.p_ifoferta = p_ifoferta;
          (this.p_id_ofertante = p_id_ofertante),
            (this.p_monto = p_monto),
            (this.p_fecha_tiempo = p_fecha_tiempo);
        }
      }
      procedure = { rows: [] };
      console.log(oracleProcedure);
      let row;
      while ((row = await resultSet.getRow())) {
        console.log(row);
        procedure.rows.push(new rowa(row[0], row[1], row[2], row[3]));
      }
      await resultSet.close();
    }
    res.json(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

//Este metodo es para ofertar en una subasta
router.post("/ofertar", authorization, async (req, res) => {
  database = req.database;
  //No puedo sacar la autenticacion
  const { monto, idsubasta } = req.body;
  const client = await pool.connect();
  console.log("Bidding");
  try {
    const checkQuerry = "select * from obtener_maxima_puja($1)";
    const queryText = "call crear_puja($1 ,$2 ,$3,0)";
    await client.query("BEGIN");
    const maxPrice = await client.query(checkQuerry, [idsubasta]);
    const maxBid = Number(maxPrice.rows[0].obtener_maxima_puja);
    console.log(maxBid);
    if (maxBid + maxBid * 0.5 < monto) {
      const procedure = await client.query(queryText, [
        monto,
        req.user,
        idsubasta,
      ]);
      res.json(procedure.rows);
    } else {
      res.json({ msg: "Su oferta es menor al x% de la oferta mas alta" });
    }
    await client.query("END");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

//Este es para ver los usuarios
router.post("/verVentasUsuario", authorization, async (req, res) => {
  database = req.database;
  let client;
  let procedure;
  if (database === "pg") client = await pool.connect();
  else client = await oracledb.getConnection();
  console.log("Getting seller aucts");
  try {
    const { cedula } = req.body;
    const oracleQuery =
      "BEGIN  casa_subastas.obtener_subastas_vendedor(:pcedula,:ret);  END;";
    const queryText = "SELECT * FROM obtener_subastas_vendedor($1)";
    if (database === "pg") procedure = await client.query(queryText, [cedula]);
    else {
      let oracleProcedure = await client.execute(oracleQuery, {
        pcedula: cedula,
        ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
      });
      class rowa {
        constructor(idsubasta, fechahoracierre, descripcionitem) {
          this.idsubasta = idsubasta;
          this.fechahoracierre = fechahoracierre;
          this.descripcionitem = descripcionitem;
        }
      }
      const resultSet = oracleProcedure.outBinds.ret;
      procedure = { rows: [] };
      let row;
      while ((row = await resultSet.getRow())) {
        procedure.rows.push(new rowa(row[0], row[1], row[2]));
      }

      // always close the ResultSet
      await resultSet.close();
    }
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

router.post("/verComprasUsuario", authorization, async (req, res) => {
  database = req.database;
  let client;
  let procedure;
  if (database === "pg") client = await pool.connect();
  else client = await oracledb.getConnection();
  console.log("Getting buyer aucts");
  try {
    const { cedula } = req.body;
    const queryText = "SELECT * FROM obtener_ventas_por_comprador($1)";
    const oracleQuery =
      "BEGIN  casa_subastas.obtener_ventas_por_comprador(:pcedula,:ret);  END;";
    if (database == "pg") procedure = await client.query(queryText, [cedula]);
    else {
      let oracleProcedure = await client.execute(oracleQuery, {
        pcedula: cedula,
        ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
      });
      class rowa {
        constructor(idsubasta, fechahoracierre, descripcionitem) {
          this.idsubasta = idsubasta;
          this.fechahoracierre = fechahoracierre;
          this.descripcionitem = descripcionitem;
        }
      }
      const resultSet = oracleProcedure.outBinds.ret;
      procedure = { rows: [] };
      let row;
      while ((row = await resultSet.getRow())) {
        procedure.rows.push(new rowa(row[0], row[1], row[2]));
      }

      // always close the ResultSet
      await resultSet.close();
    }
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

router.post("/listaUsuarios", authorization, async (req, res) => {
  database = req.database;
  let client;
  let procedure;
  console.log("Getting users");
  try {
    if (database === "pg") client = await pool.connect();
    else client = await oracledb.getConnection();
    const queryText = "SELECT * FROM obtener_usuarios()"; //Todo:Definir el procedimiento almacenado
    const oracleQuery = "BEGIN  casa_subastas.obtener_usuarios(:ret);  END;";
    if (database === "pg") procedure = await client.query(queryText);
    else {
      let oracleProcedure = await client.execute(oracleQuery, {
        ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
      });
      const resultSet = oracleProcedure.outBinds.ret;
      class rowa {
        constructor(cedula, alias, correo, tipo) {
          this.cedula = cedula;
          (this.alias = alias), (this.correo = correo), (this.tipo = tipo);
        }
      }
      procedure = { rows: [] };
      let row;
      while ((row = await resultSet.getRow())) {
        console.log(row);
        procedure.rows.push(new rowa(row[0], row[1], row[2], row[3]));
      }

      // always close the ResultSet
      await resultSet.close();
    }
    res.json(procedure.rows);
    // console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

router.post("/actualizarUsuario", authorization, async (req, res) => {
  database = req.database;
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
    telefonos,
  } = req.body;
  const estado = 0;

  const client = await pool.connect();
  console.log("Updating user:", req.body);
  try {
    const queryUpdateUserData =
      "call actualizar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const queryDeleteUserPhones = "call borrar_telefonos_usuario($1)";
    const queryAddUserPhone = "call agregar_telefono($1, $2)";

    await client.query("BEGIN");

    // Se actualizan los datos del usuario
    const userDataUpdate = await client.query(queryUpdateUserData, [
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

    // Se borran los telefonos
    await client.query(queryDeleteUserPhones, [cedula]);
    // Se agregan los nuevos
    for (let i = 0; i < telefonos.length; i++) {
      await client.query(queryAddUserPhone, [cedula, Number(telefonos[i])]);
    }

    await client.query("END;");
    res.json(userDataUpdate.rows[0]);
    console.log("Estado después de actualizar", userDataUpdate.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

// Para obtener los parámetros del sisetma
router.get("/getSystemParameters", authorization, async (req, res) => {
  database = req.database;
  const client = await pool.connect();
  console.log("Trayendo parámetros del sistema");
  const queryGetSystemParameters = "SELECT * FROM obtener_parametros_sistema()";
  try {
    // Inicio de la transacción
    await client.query("BEGIN");

    const systemParameters = await client.query(queryGetSystemParameters);

    res.json(systemParameters.rows[0]);

    await client.query("END;");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

// Para obtener los parámetros del sisetma
router.post("/updateSystemParameters", authorization, async (req, res) => {
  database = req.database;
  const client = await pool.connect();

  console.log(req.body);
  const { mejora, incrementoMinimo } = req.body;

  console.log(mejora, incrementoMinimo);

  const queryGetSystemParameters = "CALL actualizar_parametros_sistema($1, $2)";
  try {
    // Inicio de la transacción
    await client.query("BEGIN");

    await client.query(queryGetSystemParameters, [mejora, incrementoMinimo]);

    res.json("Actualización exitosa");

    await client.query("END;");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (database === process.env.POSTGRES) {
      client.release();
    } else {
      client.close();
    }
  }
});

module.exports = router;
