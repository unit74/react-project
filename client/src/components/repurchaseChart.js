import BaseChart from 'components/baseChart';
import axios from 'axios';
import { useState, useEffect } from 'react';

let data = {
  datasets: [
  {
      data: [0, 0, 0],
      backgroundColor: ['green', 'blue', 'red'],
      borderWidth: 4
  }
  ],
  labels: ['More than Once', 'Once', 'None']
};

let description = [
  {
      title: 'More than Once',
      value: 0,
      color: 'green'
  },
  {
      title: 'Once',
      value: 0,
      color: 'blue'
  },
  {
      title: 'None',
      value: 0,
      color: 'red'
  }
];

export default function RepurchaseChart() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/repurchase_chart")
    .then((res) => {
      res.data.forEach(element => {
        const id = element.id;
        const value = element.value;

        data.datasets[0].data[id] = value;
        description[id].value = value;
      });
      
      setLoading(false);
    }).catch((e) => {
      alert(e);
    });
  })

  return <BaseChart chartTitle={'재구매율'} loading={loading} data={data} description={description} />;
}