const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

router.get("/", async function(req, res){
    let connection;
    try {
   	    connection = await oracledb.getConnection(dbConfig);
        const id = req.query.customerId;
        const sql = `SELECT * FROM (ORDERS JOIN ORDER_ITEMS USING(ORDER_ID)) WHERE CUSTOMER_ID = '${id}' ORDER BY ORDER_ID`;
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