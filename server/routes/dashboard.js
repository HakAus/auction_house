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
router.post("/",async (req,res) =>{
  const client = await pool.connect();
  console.log("Getting products")
  try{
    const queryText = "SELECT * FROM obtener_subastas()";
    const procedure = await client.query(queryText);
    res.json(procedure.rows)
  }catch(err){
    console.error(err.message)
    res.status(500).send("Error en el servidor")
  }
})

//Tiene el nombre mal, tiene que ser verPujas
router.post("/verSubastas",authorization,async(req,res)=>{
  const client = await pool.connect();
  console.log("Getting bids")
  try{
    const { idsubasta } = req.body;
    const queryText = "SELECT * FROM obtener_pujas_para_subastas($1)";
    const procedure = await client.query(queryText,[
      idsubasta
    ]);
    res.json(procedure.rows)
    console.log(procedure.rows)
  }catch(err){
    console.error(err.message)
    res.status(500).send("Error en el servidor")
  }
});

//Este es para ver los usuarios
router.post("/verSubastasUsuario",authorization,async(req,res)=>{
  const client = await pool.connect();
  console.log("Getting users")
  try{
    const { cedula } = req.body;
    const queryText = "SELECT * FROM obtener_pujas_usuario($1)";//Todo:Definir el procedimiento almacenado
    const procedure = await client.query(queryText,[
      cedula
    ]);
    res.json(procedure.rows)
    console.log(procedure.rows)
  }catch(err){
    console.error(err.message)
    res.status(500).send("Error en el servidor")
  }
});

router.post("/listaUsuarios",authorization,async(req,res)=>{
  const client = await pool.connect();
  console.log("Getting users")
  try{
    const queryText = "SELECT * FROM obtener_usuarios()";//Todo:Definir el procedimiento almacenado
    const procedure = await client.query(queryText);
    res.json(procedure.rows)
    console.log(procedure.rows)
  }catch(err){
    console.error(err.message)
    res.status(500).send("Error en el servidor")
  }
});

module.exports = router;
