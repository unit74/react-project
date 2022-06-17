const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

router.get("/", async function(req, res){
    let connection;
    try {
   	    connection = await oracledb.getConnection(dbConfig);
        const id = req.query.employeeId;
        const sql = 'SELECT JOB_TITLE, FIRST_NAME, LAST_NAME, EMAIL, PHONE, WEB_ID FROM (EMPLOYEES JOIN WEB_INFORMATIONS USING(EMPLOYEE_ID)) WHERE EMPLOYEE_ID = ' + id;
        const result = await connection.execute(sql);

        const getData = result.rows[0];
        const sendData = {
            'job_title': getData.JOB_TITLE,
            'first_name': getData.FIRST_NAME,
            'last_name': getData.LAST_NAME,
            'email': getData.EMAIL,
            'phone': getData.PHONE,
            'web_id': getData.WEB_ID
        };

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