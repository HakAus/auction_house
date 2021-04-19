const oracledb = require("oracledb");

const connectOracleDatabase = async function () {
  try {
    await oracledb.createPool({
      user: "casa_subastas",
      password: "app123QWE",
      connectString: "localhost/auction_pdb",
    });
    // (DESCRIPTION =(ADDRESS = (PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA = (SERVER = DEDICATED)(SID=auction)))
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectOracleDatabase;
