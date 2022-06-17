import BaseChart from 'components/baseChart';
import axios from 'axios';
import { useState, useEffect } from 'react';

let data = {
  datasets: [
    {
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['firebrick', 'darkorange', 'lightsalmon', 'goldenrod', 'orangered'],
        borderWidth: 4
    }
  ],
  labels: ['CPU', 'Video Card', 'RAM', 'Mother Board', 'Storage']
};

let description = [
  {
    title: 'CPU',
    value: 0,
    color: 'firebrick'
  },
  {
    title: 'V.C',
    value: 0,
    color: 'darkorange'
  },
  {
    title: 'RAM',
    value: 0,
    color: 'lightsalmon'
  },
  {
    title: 'M.B',
    value: 0,
    color: 'goldenrod'
  },
  {
    title: 'Storage',
    value: 0,
    color: 'orangered'
  }
];

export default function ProductsChart() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/products_chart")
    .then((res) => {
      res.data.forEach(element => {
        const id = element.CATEGORY_ID;
        const cnt = element.CNT;

        data.datasets[0].data[id - 1] = cnt;
        description[id - 1].value = cnt;
      });

      setLoading(false);
    }).catch((e) => {
      alert(e);
    });
  })

  return <BaseChart chartTitle={'판매 제품군'} loading={loading} data={data} description={description} />;
}