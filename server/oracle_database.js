const oracledb = require("oracledb");

module.exports = async function () {
  try {
    await oracledb.createPool({
      user: "system",
      password: "admin",
      connectString: "localhost/auction_house",
    });
    // oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    return oracledb;
  } catch (err) {
    console.error(err.message);
  }
};
