const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

router.get("/", async function(req, res){
    let connection;
    try {
   	    connection = await oracledb.getConnection(dbConfig);
        let sql = 'SELECT COUNT(*) CUSTOMERS FROM CUSTOMERS';
        let result = await connection.execute(sql);

        const customers = result.rows[0].CUSTOMERS;
        
        sql = 'SELECT COUNT(*) PURCHASE FROM (SELECT COUNT(CUSTOMER_ID) CNT FROM ORDERS GROUP BY CUSTOMER_ID) WHERE CNT = 1';
        result = await connection.execute(sql);

        const purchase = result.rows[0].PURCHASE;

        sql = 'SELECT COUNT(*) REPURCHASE FROM (SELECT COUNT(CUSTOMER_ID) CNT FROM ORDERS GROUP BY CUSTOMER_ID) WHERE CNT > 1';
        result = await connection.execute(sql);

        const repurchase = result.rows[0].REPURCHASE;

        const sendData = [
            { id: 0, value: repurchase },
            { id: 1, value: purchase },
            { id: 2, value: customers - purchase - repurchase }
        ];

        res.send(sendData);
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