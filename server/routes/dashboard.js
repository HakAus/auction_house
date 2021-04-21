const router = require("express").Router();
const pool = require("../pg_database");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  const client = await pool.connect();
  try {
    // Del middleware "authorization" obtenemos el id del usuario validado (la cedula)

    const queryText = "SELECT * FROM obtener_info_usuario($1)";
    const procedure = await client.query(queryText, [req.user]);
    res.json(procedure.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

//Metodo para traer todos los items que estan en la base de datos
router.post("/", async (req, res) => {
  const client = await pool.connect();
  console.log("Getting products");
  try {
    const queryText = "SELECT * FROM obtener_subastas()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

// Método para traer las categorías
router.post("/getCategories", async (req, res) => {
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
  }
});

// Método para traer las subcategorías
router.post("/getSubcategories", async (req, res) => {
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
  }
});

// Método para agregar una subasta
router.post("/addAuction", async (req, res) => {
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
  try {
    const createItemQuery = "select * from crear_item($1, $2, $3, $4)";
    const createAuctionText = "call crear_subasta($1, $2, $3, $4)";

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
  }
});

//Tiene el nombre mal, tiene que ser verPujas
router.post("/verSubastas", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting bids");
  try {
    const { idsubasta } = req.body;
    const queryText = "SELECT * FROM obtener_pujas_para_subastas($1)";
    const procedure = await client.query(queryText, [idsubasta]);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

//Este es para ver los usuarios
router.post("/verSubastasUsuario", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting users");
  try {
    const { cedula } = req.body;
    const queryText = "SELECT * FROM obtener_pujas_usuario($1)"; //Todo:Definir el procedimiento almacenado
    const procedure = await client.query(queryText, [cedula]);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

router.post("/listaUsuarios", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting users");
  try {
    const queryText = "SELECT * FROM obtener_usuarios()"; //Todo:Definir el procedimiento almacenado
    const procedure = await client.query(queryText);
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
