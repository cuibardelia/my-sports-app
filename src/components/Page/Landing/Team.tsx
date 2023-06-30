import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Avatar, Box, Button, Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Slide from 'react-reveal/Slide';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

const TeamContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background-color: transparent;
  position: relative;
`;

const TeamAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

const TeamText = styled(Typography)(({ theme }) => ({
  color: '#30424D',
  textAlign: 'center',
}));

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const Team = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const onJoinClick = () => {
    navigate('/auth/trainer/register');
  };

  useEffect(() => {
    // TODO: custom hook
    axios.get('http://localhost:5000/api/auth/get-trainers', { headers: { 'Content-type': 'application/json' } })
      .then((response) => {
        const avatars = response.data.users
          .filter((u) => u.picUrl)
          .map((u) => u.picUrl)
          .slice(0, 8);
        setData(avatars);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <TeamContainer>
      <Slide bottom duration={1000}>
        <TeamText variant="h5">Our trainers</TeamText>
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
                {data.slice(0, 4).map((a) => (
                  <TeamAvatar src={a} />
                ))}
              </Box>
            </Carousel.Item>
            <Carousel.Item>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {data.slice(4, 8).map((a) => (
                  <TeamAvatar src={a} />
                ))}
              </Box>
            </Carousel.Item>
          </Carousel>
        </Box>
        <TeamText variant="subtitle1">Meet the people that made it all happen.</TeamText>
        <ButtonContainer>
          <Button onClick={onJoinClick} variant="outlined" color="secondary">
            Join our team
          </Button>
        </ButtonContainer>
      </Slide>
    </TeamContainer>
  );
};

export default Team;
