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
   	    connection = await oracledb.getConnection(dbConfig);
        const id = req.body.id;
        const pw = req.body.pw;

        const employees_web = `EMPLOYEES JOIN WEB_INFORMATIONS USING(EMPLOYEE_ID)`;
        const employees_job = `(${employees_web}) JOIN JOB_TEAMS USING(JOB_TEAM_ID)`;
        let sql = `SELECT EMPLOYEE_ID, JOB_DEPARTMENT_ID, JOB_TEAM_NAME, WEB_AUTHORITY FROM (${employees_job}) WHERE WEB_ID = '${id}' AND WEB_PW = '${pw}'`;
        let result = await connection.execute(sql);

        let sendData;
        if(result.rows.length === 0) {
            sendData = [
                { name: "authority", value: false },
                { name: "msg", value: "아이디와 비밀번호를 확인해주세요."}
            ];
        }
        else {
            let getData = result.rows[0];
            if(getData.WEB_AUTHORITY === 'Approved') {
                if(!getData.JOB_DEPARTMENT_ID) {
                    sendData = [
                        { name: "authority", value: true },
                        { name: "employee_id", value: getData.EMPLOYEE_ID } ,
                        { name: "job_department_name", value: getData.JOB_TEAM_NAME },
                        { name: "job_team_name", value: 'Manager' }
                    ];
                }
                else {
                    sendData = [
                        { name: "authority", value: true },
                        { name: "employee_id", value: getData.EMPLOYEE_ID } ,
                        { name: "job_team_name", value: getData.JOB_TEAM_NAME }
                    ];

                    const job_department_id = getData.JOB_DEPARTMENT_ID;
                    sql = `SELECT JOB_TEAM_NAME JOB_DEPARTMENT_NAME FROM JOB_TEAMS WHERE JOB_TEAM_ID = ${job_department_id}`;
                    result = await connection.execute(sql);
                    getData = result.rows[0];

                    sendData.push({ name: "job_department_name", value: result.rows[0].JOB_DEPARTMENT_NAME });
                }
            }
            else {
                sendData = [
                    { name: "authority", value: false },
                    { name: "msg", value: "접속이 제한된 아이디입니다." }
                ];
            }
        }

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