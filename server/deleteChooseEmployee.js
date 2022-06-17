const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", async function(req, res){
    let connection;
    try {
        oracledb.autoCommit = true;
   	    connection = await oracledb.getConnection(dbConfig);
        const employeeId = req.body.employeeId;

        sql = `DELETE FROM EMPLOYEES WHERE EMPLOYEE_ID = ${employeeId}`;
        result = await connection.execute(sql);
        
        res.send(result);
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