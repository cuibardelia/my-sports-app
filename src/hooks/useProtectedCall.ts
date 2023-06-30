import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../Providers/AuthContext';
import { getProtectedHeaders, rapidOptions } from '../helpers/fnRequest';
import { Exercise } from '../components/types/Exercise';

export const useProtectedHeaders = () => {
  const { token } = useAuthContext();
  return {
    headers: getProtectedHeaders(token),
  };
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

export const fetchFavExercises = async (ids: string[]): Promise<Exercise[]> => {
  const requests = ids.map((id) => axios.get(`${process.env.EXERCISES_API}/exercise/${encodeURI(id)}`, rapidOptions));

  try {
    const responses = await Promise.all(requests);
    return await Promise.all(responses.map((response) => response.data));
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};
