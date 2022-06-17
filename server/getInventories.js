const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

router.get("/", async function(req, res){
    let connection;
    try {
   	    connection = await oracledb.getConnection(dbConfig);
        const iw = '(INVENTORIES JOIN WAREHOUSES USING(WAREHOUSE_ID))';
        const wl = `(${iw} JOIN LOCATIONS USING(LOCATION_ID))`;
        const lc = `(${wl} JOIN COUNTRIES USING(COUNTRY_ID))`;
        const cr = `(${lc} JOIN REGIONS USING(REGION_ID))`;
        const sql = `SELECT * FROM ${cr}`;
        const result = await connection.execute(sql);

        res.send(result.rows);
    }
    catch(e) {
        console.log(e)
    }
    finally{
        if(connection) {
            try {
                await connection.close()
            }
            catch(e) {
                console.log(e)
            }
        }
    }
});

module.exports = router;