const router = require("express").Router();
const oracledb = require("oracledb");
const pool = require("../pg_database");
const authorization = require("../middleware/authorization");
const OracleDB = require("oracledb");

router.get("/", authorization, async (req, res) => {
  let client
  database = "oracle"

  try {
    if(database === "pg")
    client = await pool.connect();
  else
    client =  await oracledb.getConnection();
    // Del middleware "authorization" obtenemos el id del usuario validado (la cedula)
    let procedure
    const queryText = "SELECT * FROM obtener_info_usuario($1)";
    const oracleQuery =  'BEGIN  casa_subastas.obtener_info_usuario(:pcedula,:ret);  END;';
    if(database === "pg")
      procedure = await client.query(queryText, [req.user]);
    else{
        oracleProcedure = await client.execute(oracleQuery,{pcedula:req.user,
        ret:{type:oracledb.CURSOR,dir:oracledb.BIND_OUT}});
        const resultSet = oracleProcedure.outBinds.ret;
        //Clase para que coincida con postgres
        class rowa{constructor(alias,tipo,cedula){this.alias = alias;this.tipousuario = tipo;this.cedula = cedula}}
        procedure = {rows:[]}
        let row;
        while ((row = await resultSet.getRow())) {
            procedure.rows.push(new rowa(row[0],row[1],req.user))
        }
                                                
        // always close the ResultSet
        await resultSet.close();
      }
    res.json(procedure.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
  client.close();
});

//Metodo para traer todos los items que estan en la base de datos
router.post("/getProducts",authorization, async (req, res) => {
  database = "oracle"
  let client

  console.log("Getting products");
  try {
    if(database === "pg")
    client = await pool.connect();
    else{
      client = await oracledb.getConnection();
    }
    const queryText = "SELECT * FROM obtener_subastas()";
    const oracleQuery = 'BEGIN  casa_subastas.obtener_subastas(:ret);  END;';
    let procedure
    if(database === "pg")
      procedure = await client.query(queryText);
    else{
    let oracleProcedure = await client.execute(oracleQuery,{ret:{type: oracledb.CURSOR, dir: oracledb.BIND_OUT}})
    const resultSet = oracleProcedure.outBinds.ret;
    class rowa{constructor(idsubcategoria,idsubasta,descripcion,fechaDeCierre,preciobase,imagen,detallesdeentrega){this.idsubcategoria = idsubcategoria;this.idsubasta = idsubasta;this.fechaDeCierre = fechaDeCierre;this.descripcion = descripcion;this.preciobase = preciobase;this.imagen = imagen;this.detallesdeentrega = detallesdeentrega}}
    procedure = {rows:[]}
    let row;
    while ((row = await resultSet.getRow())) {
      //console.log(row)
      procedure.rows.push(new rowa(row[0],row[1],row[2],row[3],row[4],row[5],row[6]))
    }
    await resultSet.close();//Cierre de conexion y result set
    client.close();
    }
    res.json(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

// Método para traer las categorías
router.post("/getCategories",authorization, async (req, res) => {
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
router.post("/getSubcategories",authorization, async (req, res) => {
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
//Trabajando aca
router.post("/verSubastas", authorization, async (req, res) => {
  const { idsubasta } = req.body;
  let client
  let procedure
  database = "oracle"

  console.log("Getting bids");
  try {
    if(database === "pg")
      client = await pool.connect();
    else
      client = await oracledb.getConnection();
    const queryText = "select * from obtener_pujas_para_subastas($1)";
    const oracleQuery = 'BEGIN  casa_subastas.obtener_pujas_para_subastas(:pidsubasta,:ret);  END;';
    if(database == "pg")
      procedure = await client.query(queryText, [idsubasta]);
    else{
      console.log(req.body)
      let oracleProcedure = await client.execute(oracleQuery,{pidsubasta:idsubasta,
                                                              ret:{type:oracledb.CURSOR,dir:oracledb.BIND_OUT}})
      const resultSet = oracleProcedure.outBinds.ret;
      class rowa{constructor(p_ifoferta,p_id_ofertante,p_monto,p_fecha_tiempo){this.p_ifoferta = p_ifoferta;this.p_id_ofertante = p_id_ofertante,this.p_monto = p_monto,this.p_fecha_tiempo = p_fecha_tiempo}}
      procedure = {rows:[]}
      console.log(oracleProcedure)
      let row;
      while ((row = await resultSet.getRow())) {
        console.log(row)
        procedure.rows.push(new rowa(row[0],row[1],row[2],row[3]))
      }
      await resultSet.close();
      client.close()
    }
    res.json(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

//Este metodo es para ofertar en una subasta
router.post("/ofertar",authorization, async (req, res) => {//No puedo sacar la autenticacion
  const { monto,
          idsubasta } = req.body;
  const client = await pool.connect();
  console.log("Bidding");
  try {
    const checkQuerry = "select * from obtener_maxima_puja($1)";
    const queryText = "call crear_puja($1 ,$2 ,$3,0)";
    await client.query("BEGIN")
    const maxPrice = await client.query(checkQuerry, [idsubasta]);
    const maxBid = Number(maxPrice.rows[0].obtener_maxima_puja);
    console.log(maxBid)
    if(maxBid + maxBid*0.5 < monto){
      const procedure = await client.query(queryText, [monto,req.user,idsubasta]);
      res.json(procedure.rows);
    }
    else{
      res.json("Su oferta es menor al x% de la oferta mas alta")
    }
    await client.query("END")
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

//Este es para ver los usuarios
router.post("/verVentasUsuario", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting seller aucts");
  try {
    const { cedula } = req.body;
    console.log(req.body)
    console.log(cedula)
    const queryText = "SELECT * FROM obtener_subastas_vendedor($1)";
    const procedure = await client.query(queryText, [cedula]);
    res.json(procedure.rows);
    console.log(procedure.rows)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

router.post("/verComprasUsuario", authorization, async (req, res) => {
  const client = await pool.connect();
  console.log("Getting buyer aucts");
  try {
    const { cedula } = req.body;
    const queryText = "SELECT * FROM obtener_ventas_por_comprador($1)";
    const procedure = await client.query(queryText, [cedula]);
    res.json(procedure.rows);
    console.log(procedure.rows)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

router.post("/listaUsuarios", authorization, async (req, res) => {
  let client;
  let procedure;
  database = "oracle"
  console.log("Getting users");
  try {
    if(database = "pg")
      client = await pool.connect();
    else
      client = await oracledb.getConnection();
    const queryText = "SELECT * FROM obtener_usuarios()"; //Todo:Definir el procedimiento almacenado
    const oracleQuery = 'BEGIN  casa_subastas.obtener_usuarios(:ret);  END;';
    if(database = "pg")
       procedure = await client.query(queryText);
    else{
      let oracleProcedure = await client.execute(oracleQuery,{ret:{type:oracledb.CURSOR, dir:oracledb.BIND_OUT}})
      
    }
    res.json(procedure.rows);
    console.log(procedure.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
