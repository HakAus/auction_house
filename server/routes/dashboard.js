const router = require("express").Router();
const pool = require("../pg_database");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  const client = await pool.connect();
  try {
    // Del middleware "authorization" obtenemos el id del usuario validado (la cedula)

    const queryText = "SELECT * FROM obtener_info_usuario($1)";
    console.log(req.user)
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
    const queryText = "SELECT * FROM Items";
    const procedure = await client.query(queryText);
    res.json(procedure)
  }catch(err){
    console.error(err.message)
    res.status(500).send("Error en el servidor")
  }
})

module.exports = router;
