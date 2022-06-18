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
        const webId = req.body.webId;
        const webPw = req.body.webPw;
        const webAuthority = req.body.webAuthority;

        let sql = `SELECT WEB_ID FROM WEB_INFORMATIONS WHERE WEB_ID = '${webId}'`;
        const result = await connection.execute(sql);

        if(result.rows.length !== 0) {
            res.send({complete: false, state: { isMsg: true, sendSvt: 'error', sendMsg: '중복된 아이디가 있습니다.'}})
            return;
        }

        sql = `UPDATE WEB_INFORMATIONS SET WEB_ID = '${webId}', WEB_PW = '${webPw}', WEB_AUTHORITY = '${webAuthority}' WHERE EMPLOYEE_ID = ${employeeId}`;
        await connection.execute(sql);
        
        res.send({complete: true, state: { isMsg: true, sendSvt: 'success', sendMsg: '저장되었습니다.', refresh: true }});
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