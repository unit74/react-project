import { Routes, Route } from 'react-router-dom';
import Home from 'home';
import Login from 'pages/login';
import NoMatch from 'noMatch';
import OperationsDepartment from 'pages/operationsDepartment/base';
import OperationsDepartmentMain from 'pages/operationsDepartment/main';
import OperationsDepartmentEmployees from 'pages/operationsDepartment/employees';
import OperationsDepartmentWeb from 'pages/operationsDepartment/web';
import DevelopmentDepartment from 'pages/developmentDepartment/base';
import DevelopmentDepartmentMain from 'pages/developmentDepartment/main';
import PlanningDepartment from 'pages/planningDepartment/base';
import PlanningDepartmentMain from 'pages/planningDepartment/main';
import PlanningDepartmentProducts from 'pages/planningDepartment/products';
import PlanningDepartmentStocks from 'pages/planningDepartment/stocks';
import PlanningDepartmentCustomers from 'pages/planningDepartment/customers';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/operations_department" element={<OperationsDepartment />}>
        <Route index element={<OperationsDepartmentMain />} />
        <Route path="employees" element={<OperationsDepartmentEmployees />} />
        <Route path="web" element={<OperationsDepartmentWeb />} />
      </Route>
      <Route path="/development_department" element={<DevelopmentDepartment />}>
        <Route index element={<DevelopmentDepartmentMain />} />
      </Route>
      <Route path="/planning_department" element={<PlanningDepartment />}>
        <Route index element={<PlanningDepartmentMain />} />
        <Route path="products" element={<PlanningDepartmentProducts />} />
        <Route path="stocks" element={<PlanningDepartmentStocks />} />
        <Route path="customers" element={<PlanningDepartmentCustomers />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}