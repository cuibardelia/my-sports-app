import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slide from 'react-reveal/Slide';
import { Box, Divider } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { fetchFavExercises } from '../../hooks/useProtectedCall';
import ExerciseImage from '../Card/ExerciseImage';

const Container = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  position: relative;
`;

const ImageContainer = styled(Box)`
  width: 20%;
  height: 200px;
  margin: 40px;
`;

const ExercisesStats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/get-exercises', { headers: { 'Content-type': 'application/json' } })
      .then((response) => {
        console.log('here', response);
        fetchFavExercises(response.data.exerciseIds).then((r) => setData(r));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return null;
  }
  console.log('here, da', data);
  return (
    <Container>
      <Slide bottom duration={1000}>
        <Box sx={{ width: '20%', backgroundColor: ' #30424D' }}>
          <Divider />
        </Box>
        <Box sx={{
          display: 'flex', justifyContent: 'center', marginTop: '20px',
        }}
        >
          <Carousel indicators={false} prevLabel="" nextLabel="">
            <Carousel.Item>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {data.slice(0, 3).map((a) => (
                  <ImageContainer><ExerciseImage exercise={a} /></ImageContainer>
                ))}
              </Box>
            </Carousel.Item>
            <Carousel.Item>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {data.slice(3, 6).map((a) => (
                  <ImageContainer><ExerciseImage exercise={a} /></ImageContainer>
                ))}
              </Box>
            </Carousel.Item>
          </Carousel>
        </Box>
      </Slide>
    </Container>
  );
};
export default ExercisesStats;
