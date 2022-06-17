import BaseChart from 'components/baseChart';
import axios from 'axios';
import { useState, useEffect } from 'react';

let data = {
  datasets: [
    {
        data: [0, 0],
        backgroundColor: ['green', 'red'],
        borderWidth: 4
    }
  ],
  labels: ['Approved', 'Rest']
};

let description = [
  {
      title: 'Approved',
      value: 0,
      color: 'green'
  },
  {
      title: 'Rest',
      value: 0,
      color: 'red'
  }
];

export default function EmployeesRestChart() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/employees_rest_chart")
    .then((res) => {
      res.data.forEach(element => {
        const id = element.WEB_AUTHORITY;
        const cnt = element.CNT;

        data.datasets[0].data[id === 'Approved' ? 0 : 1] = cnt;
        description[id === 'Approved' ? 0 : 1].value = cnt;
      });
      
      setLoading(false);
    }).catch((e) => {
      alert(e);
    });
  })

  return <BaseChart chartTitle={'웹 허가 상태'} loading={loading} data={data} description={description} />;
}