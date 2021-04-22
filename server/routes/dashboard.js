const router = require("express").Router();
const pool = require("../pg_database");
const authorization = require("../middleware/authorization");

router.get("/obtenerAliasTipoUsuario", authorization, async (req, res) => {
  const client = await pool.connect();
  try {
    // Del middleware "authorization" obtenemos el id del usuario validado (la cedula)

    const queryText = "SELECT * FROM obtener_alias_y_tipo_usuario($1)";
    const procedure = await client.query(queryText, [req.user]);
    console.log(procedure);
    const response = {
      cedula: req.user,
      alias: procedure.rows[0].alias,
      tipousuario: procedure.rows[0].tipousuario,
    };
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

router.post("/obtenerInfoCompletaUsuario", authorization, async (req, res) => {
  const client = await pool.connect();
  try {
    // Del middleware "authorization" obtenemos el id del usuario validado (la cedula)
    const queryText = "SELECT * FROM obtener_info_completa_usuario($1)";
    const procedure = await client.query(queryText, [req.body.cedula]);
    console.log(procedure.rows[0]);
    res.json(procedure.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

//Metodo para traer todos los items que estan en la base de datos
router.post("/", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting products");
  try {
    const queryText = "SELECT * FROM obtener_subastas()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

// Método para traer las categorías
router.post("/getCategories", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting categories");
  try {
    const queryText = "SELECT * FROM obtener_categorias()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error("ERORR GETTING THE CATEGORIES", err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

// Método para traer las subcategorías
router.post("/getSubcategories", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting subcategories");
  try {
    const queryText = "SELECT * FROM obtener_subcategorias()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error("ERORR GETTING THE SUBCATEGORIES", err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

// Método para agregar una subasta
router.post("/addAuction", authorization, async (req, res) => {
  // Se desestructura el body
  // const {
  //   sellerAlias,
  //   subcategoryId,
  //   description,
  //   basePrice,
  //   date,
  //   time,
  //   image,
  //   deliveryDetails,
  // } = req.body;
  // const datetime = date + " " + time;
  // // Se hace la llamada a la base de datos
  // const client = await pool.connect();
  // console.log("Adding auction");
  // console.log("image data:", image);
  // try {
  //   const createItemQuery = "select * from crear_item($1, $2, $3, $4)";
  //   const createAuctionText = "call crear_subasta($1, $2, $3, $4)";
  //   console.log(
  //     "Para meter en crear item:",
  //     subcategoryId,
  //     basePrice,
  //     description,
  //     image
  //   );
  //   const itemId = await client.query(createItemQuery, [
  //     subcategoryId,
  //     basePrice,
  //     description,
  //     image,
  //   ]);
  //   await client.query("BEGIN");
  //   console.log(
  //     "Para meter en crear subastas: ",
  //     itemId.rows[0].crear_item,
  //     sellerAlias,
  //     datetime,
  //     deliveryDetails
  //   );
  //   await client.query(createAuctionText, [
  //     itemId.rows[0].crear_item,
  //     sellerAlias,
  //     datetime,
  //     deliveryDetails,
  //   ]);
  //   await client.query("END;");
  //   res.json("Subasta agregada correctamente");
  // } catch (err) {
  //   console.error("ERORR ADDING THE AUCTION", err.message);
  //   res.status(500).send("Error en el servidor");
  // }
});

//Tiene el nombre mal, tiene que ser verPujas
router.post("/verSubastas", authorization, async (req, res) => {
  const { idsubasta } = req.body;
  const client = await pool.connect();
  console.log("Getting bids");
  try {
    const queryText = "select * from obtener_pujas_para_subastas($1)";
    const procedure = await client.query(queryText, [idsubasta]);
    res.json(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

//Este metodo es para ofertar en una subasta
router.post("/ofertar", authorization, async (req, res) => {
  //No puedo sacar la autenticacion
  const { monto, idsubasta } = req.body;
  const client = await pool.connect();
  console.log("Bidding");
  try {
    const checkQuerry = "select * from obtener_maxima_puja($1)";
    const queryText = "call crear_puja($1 ,$2 ,$3,0)";
    await client.query("BEGIN");
    const maxPrice = await client.query(checkQuerry, [idsubasta]); //Que pasa con 0 ofertas?
    const maxBid = Number(maxPrice.rows[0].obtener_maxima_puja);
    if (maxBid + maxBid * 0.5 < monto) {
      const procedure = await client.query(queryText, [
        monto,
        req.user,
        idsubasta,
      ]);
      res.json(procedure.rows);
    } else {
      res.json("Su oferta es menor al x% de la oferta mas alta");
    }
    await client.query("END");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

//Este es para ver los usuarios
router.post("/verSubastasUsuario", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting users");
  try {
    const { cedula } = req.body;
    console.log(req.body);
    const queryText = "SELECT * FROM obtener_pujas_usuario($1)"; //Todo:Definir el procedimiento almacenado
    const procedure = await client.query(queryText, [cedula]);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

router.post("/listaUsuarios", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting users");
  try {
    const queryText = "SELECT * FROM obtener_usuarios()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

router.post("/actualizarUsuario", authorization, async (req, res) => {
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
  } = req.body;
  const estado = 0;

  const client = await pool.connect();
  console.log("Updating user");
  console.log("New info: aaaaa", req.body);
  try {
    const queryText =
      "call actualizar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const procedure = await client.query(queryText, [
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
    res.json(procedure.rows[0]);
    console.log("Estado después de actualizar", procedure.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  } finally {
    client.release();
  }
});

module.exports = router;
