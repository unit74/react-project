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

        const employees = result.rows;

        sql = 'SELECT EMPLOYEE_ID FROM WEB_INFORMATIONS ORDER BY EMPLOYEE_ID';
        result = await connection.execute(sql);

        const webs = result.rows;
        let sendData = { WEB_EMPLOYEE_ID: [] };
        let idx = 0;
        for(var i = 0; i < webs.length;) {
            if(webs[i].EMPLOYEE_ID === employees[idx].EMPLOYEE_ID) {
                i++;
                idx++;
            }
            else {
                sendData.WEB_EMPLOYEE_ID.push({EMPLOYEE_ID: employees[idx].EMPLOYEE_ID});
                idx++;
            }
        }

        for(; idx < employees.length; idx++)
            sendData.WEB_EMPLOYEE_ID.push({EMPLOYEE_ID: employees[idx].EMPLOYEE_ID});


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