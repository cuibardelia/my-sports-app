import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GenericPieChart from './GenericPieChart';

const AgeStat = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/get-age-stats', { headers: { 'Content-type': 'application/json' } })
      .then((response) => {
        const mappedArray = Object.entries(response.data.ageIntervals).map(([key, value]) => {
          if (key !== '_id') {
            return {
              name: key.replace('interval_', '').replace('_', '-'),
              value,
            };
          }
          return null;
        }).filter((e) => !!e);

        setData(mappedArray);
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
export default AgeStat;
