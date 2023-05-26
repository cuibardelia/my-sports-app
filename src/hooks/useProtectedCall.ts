import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../Providers/AuthContext';
import { getProtectedHeaders, rapidOptions } from '../helpers/fnRequest';

const useProtectedHeaders = () => {
  const { token } = useAuthContext();
  const options = {
    headers: getProtectedHeaders(token),
  };

  return options;
};

export const useProtectedCallback = (api: string, dataKey: string, callback) => {
  const options = useProtectedHeaders();

  return () => {
    axios.get(api, options)
      .then((response) => {
        callback(response.data[dataKey]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const useProtectedCall = (api: string, dataKey: string) => {
  // FIXME: type = default value
  const [data, setData] = useState([]);
  const callAPI = useProtectedCallback(api, dataKey, setData);

  useEffect(() => {
    callAPI();
  }, []);

  return { data };
};

export const getRapidAPI = (api: string, callback) => () => {
  axios.get(`${process.env.EXERCISES_API}/${api}`, rapidOptions)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
