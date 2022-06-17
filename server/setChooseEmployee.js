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
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const hireDate = req.body.hireDate;
        const managerId = req.body.managerId;
        const jobTitle = req.body.jobTitle;
        const jobTeamId = req.body.jobTeamId;

        const sql = `UPDATE EMPLOYEES SET FIRST_NAME = '${firstName}', LAST_NAME = '${lastName}', EMAIL = '${email}', PHONE = '${phone}', HIRE_DATE = TO_DATE('${hireDate}', 'DD-MM-RR'), MANAGER_ID = '${managerId}', JOB_TITLE = '${jobTitle}', JOB_TEAM_ID = ${jobTeamId} WHERE EMPLOYEE_ID = ${employeeId}`;
        const result = await connection.execute(sql);
        
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