import Dashboard from "components/dashboard";
import ListItems from 'pages/planningDepartment/listItems';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Base() {
    const department = sessionStorage.getItem('job_department_name');
    const url = sessionStorage.getItem('url');
    const navigate = useNavigate();

    useEffect(() => {
        if(!url)
            navigate("/login", { state: { isMsg: true, sendSvt: 'error', sendMsg: '로그인 후 이용 가능합니다.' }});
        else if(department !== 'Planning Department')
            navigate(url, { state: { isMsg: true, sendSvt: 'error', sendMsg: '접근 권한이 없습니다.' }});
    });
    
    return <Dashboard ListItems={<ListItems />} />; 
}