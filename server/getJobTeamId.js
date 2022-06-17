const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

router.get("/", async function(req, res){
    let connection;
    try {
   	    connection = await oracledb.getConnection(dbConfig);
        const id = req.query.managerId || 1;
        
        let sql = `SELECT JOB_TEAM_ID FROM EMPLOYEES WHERE EMPLOYEE_ID = ${id}`;
        let result = await connection.execute(sql);
        const manager_job_team_id = result.rows[0].JOB_TEAM_ID;

        sql = `SELECT JOB_TEAM_ID FROM JOB_TEAMS WHERE JOB_TEAM_ID = ${manager_job_team_id} OR JOB_DEPARTMENT_ID = ${manager_job_team_id} ORDER BY JOB_TEAM_ID`;
        result = await connection.execute(sql);
        let sendData = {};
        sendData.JOB_TEAM_ID_MENU = result.rows;

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