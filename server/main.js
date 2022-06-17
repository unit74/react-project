const express = require("express");
const app = express();
const Login = require('./login');
const EmployeesChart = require('./employeesChart');
const EmployeesRestChart = require('./employeesRestChart');
const ProductsChart = require('./productsChart');
const RepurchaseChart = require('./repurchaseChart');
const GetProfile = require('./getProfile');
const SetProfile = require('./setProfile');
const GetEmployees = require('./getEmployees');
const AddEmployee = require('./addEmployee');
const GetEmployeeId = require('./getEmployeeId');
const GetChooseEmployee = require('./getChooseEmployee');
const SetChooseEmployee = require('./setChooseEmployee');
const DeleteChooseEmployee = require('./deleteChooseEmployee');
const GetJobTeamId = require('./getJobTeamId');
const GetWebInformations = require('./getWebInformations');
const GetWebId = require('./getWebId');
const AddWebInformations = require('./addWebInformations');
const GetChooseWebInformations = require('./getChooseWebInformations');
const SetChooseWebInformations = require('./setChooseWebInformations');
const DeleteChooseWebInformations = require('./deleteChooseWebInformations');
const GetProducts = require('./getProducts');
const GetInventories = require('./getInventories');
const GetCustomers = require('./getCustomers');
const GetOrders = require('./getOrders');

const cors = require('cors');
const oracledb = require("oracledb");
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

app.use(cors({ origin: "*"}));

const server = app.listen(8000, () => {
    console.log("Server Start : localhost:8000");
});

app.get("/", function(req, res) {
    res.send("Server Start !");
});

app.use("/login", Login);
app.use("/employees_chart", EmployeesChart);
app.use("/employees_rest_chart", EmployeesRestChart);
app.use("/products_chart", ProductsChart);
app.use("/repurchase_chart", RepurchaseChart);
app.use("/get_profile", GetProfile);
app.use("/set_profile", SetProfile);
app.use("/get_employees", GetEmployees);
app.use("/add_employee", AddEmployee);
app.use("/get_employee_id", GetEmployeeId);
app.use("/get_choose_employee", GetChooseEmployee)
app.use("/set_choose_employee", SetChooseEmployee)
app.use("/delete_choose_employee", DeleteChooseEmployee)
app.use("/get_job_team_id", GetJobTeamId);
app.use("/get_web_informations", GetWebInformations);
app.use("/get_web_id", GetWebId);
app.use("/add_web_informations", AddWebInformations);
app.use("/get_choose_web_informations", GetChooseWebInformations);
app.use("/set_choose_web_informations", SetChooseWebInformations);
app.use("/delete_choose_web_informations", DeleteChooseWebInformations);
app.use("/get_products", GetProducts);
app.use("/get_inventories", GetInventories);
app.use("/get_customers", GetCustomers);
app.use("/get_orders", GetOrders);