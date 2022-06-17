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
        const id = req.body.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const pw = req.body.pw;

        let sql = `UPDATE EMPLOYEES SET FIRST_NAME = '${firstName}', LAST_NAME = '${lastName}', EMAIL = '${email}', PHONE = '${phone}' WHERE EMPLOYEE_ID = ${id}`;
        let result = await connection.execute(sql);
        
        sql = `UPDATE WEB_INFORMATIONS SET WEB_PW = '${pw}' WHERE EMPLOYEE_ID = ${id}`;
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