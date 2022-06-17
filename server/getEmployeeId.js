const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

router.get("/", async function(req, res){
    let connection;
    try {
   	    connection = await oracledb.getConnection(dbConfig);
        let sql = 'SELECT EMPLOYEE_ID FROM EMPLOYEES ORDER BY EMPLOYEE_ID';
        let result = await connection.execute(sql);

        let cnt = 1;
        result.rows.forEach((e) => {
            if(cnt === e.EMPLOYEE_ID)
                cnt++;
        });

        let sendData = {'EMPTY_EMPLOYEE_ID': cnt};

        sql = `SELECT EMPLOYEE_ID FROM EMPLOYEES`;
        result = await connection.execute(sql);

        sendData.EXIST_EMPLOYEES_ID = result.rows;
        
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