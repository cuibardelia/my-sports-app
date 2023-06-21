import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GenericPieChart from './GenericPieChart';

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/get-objectives', { headers: { 'Content-type': 'application/json' } })
      .then((response) => {
        const achieved = Math.round(response.data.stat.percentageAchieved) + 1;
        setData([
          { name: 'Achievers', value: achieved },
          { name: 'On their way', value: 100 - achieved },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return null;
  }
  return (
    <GenericPieChart data={data} />
  );
};

export default PieChartComponent;
