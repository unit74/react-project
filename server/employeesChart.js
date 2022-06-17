const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

router.get("/", async function(req, res){
    let connection;
    try {
   	    connection = await oracledb.getConnection(dbConfig);
        const sql = 'SELECT JOB_DEPARTMENT_ID, COUNT(JOB_DEPARTMENT_ID) CNT FROM (EMPLOYEES JOIN JOB_TEAMS USING(JOB_TEAM_ID)) GROUP BY JOB_DEPARTMENT_ID HAVING JOB_DEPARTMENT_ID IS NOT NULL';
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