import BaseChart from 'components/baseChart';
import axios from 'axios';
import { useState, useEffect } from 'react';

let data = {
  datasets: [
    {
        data: [0, 0, 0],
        backgroundColor: ['red', 'crimson', 'orange'],
        borderWidth: 4
    }
  ],
  labels: ['Operations', 'Development', 'Planning']
};

let description = [
  {
      title: 'Operations',
      value: 0,
      color: 'red'
  },
  {
      title: 'Development',
      value: 0,
      color: 'crimson'
  },
  {
      title: 'Planning',
      value: 0,
      color: 'orange'
  }
];

export default function EmployeesChart() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/employees_chart")
    .then((res) => {      
      res.data.forEach(element => {
        const id = element.JOB_DEPARTMENT_ID;
        const cnt = element.CNT;

        data.datasets[0].data[id - 1] = cnt + 1;
        description[id - 1].value = cnt + 1;
      });
      
      setLoading(false);
    }).catch((e) => {
      alert(e);
    });
  })

  return <BaseChart chartTitle={'직원 부서 분포'} loading={loading} data={data} description={description} />;
}