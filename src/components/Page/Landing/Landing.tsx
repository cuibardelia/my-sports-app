import React from 'react';
import { Parallax } from 'react-parallax';
import Carousel from 'react-bootstrap/Carousel';
import {
  Box,
  Divider,
  Paper,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Slide from 'react-reveal/Slide';
import { useNavigate } from 'react-router-dom';
import ScrollDown from './ScrollDown';
import TitleMessage from './TitleMessage';
import ObjectiveStat from './ObjectiveStat';
import StatsPieChart from '../../Chart/StatsPieChart';
import AgeStat from '../../Chart/AgeStat';
import Team from './Team';

const StyledBox = styled(Box)({
  height: '500px',
});

const ParallaxContainer = styled(Box)({
  width: '100%',
});

const LandingContainer = styled(Typography)(({ theme }) => ({
  // @ts-ignore
  background: `linear-gradient(45deg, ${theme.palette.secondary.light}, ${theme.palette.accent.secondary})`,
  width: '100%',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  // @ts-ignore
  background: `linear-gradient(45deg, ${theme.palette.secondary.light}, ${theme.palette.text.primary})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3rem',
}));

const StatsRowContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '1rem',
  padding: '1rem',
}));

const TextBoxContainer = styled(Paper)`
  padding: 20px;
  background-color: transparent;
  box-shadow: none;
`;

const TextBoxContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.background.paper,
  textAlign: 'justify',
}));

const Overlay = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
`;

const CarouselImage = styled('img')`
  width: 100%;
`;

const CarouselItem = styled(Carousel.Item)`
  position: relative;
`;

const LoginButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
`;

const Landing = () => {
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate('/auth');
  };
  return (
    <LandingContainer>
      <LoginButton onClick={onLoginClick} variant="outlined" color="primary">
        Login
      </LoginButton>
      <Box>
        <StyledBox component="div" marginBottom={3}>
          <Carousel>
            <CarouselItem>
              <CarouselImage
                src="/assets/slider-1.png"
                alt="First slide"
                style={{ width: '100%' }}
              />
              <Overlay />
            </CarouselItem>
            <CarouselItem>
              <CarouselImage
                src="/assets/slider-2.png"
                alt="Second slide"
                style={{ width: '100%' }}
              />
              <Overlay />
            </CarouselItem>
            <CarouselItem>
              <CarouselImage
                src="/assets/slider-3.png"
                alt="Third slide"
                style={{ width: '100%' }}
              />
              <Overlay />
            </CarouselItem>
          </Carousel>
        </StyledBox>
        <ScrollDown />
        <TitleMessage />
      </Box>
      <ParallaxContainer>
        <Parallax
          blur={{ min: -30, max: 30 }}
          bgImage="/assets/parallax.webp"
          bgImageAlt=""
          strength={-200}
        >
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
              <Slide bottom duration={1000}>
                <hr />
                <ObjectiveStat />
              </Slide>
            </Box>
          </div>

          <StatsContainer>
            <StatsRowContainer>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                <Slide left duration={1000}>
                  <TextBoxContainer>
                    <TextBoxContent>
                      Discover the remarkable journey of our clients towards achieving their fitness goals!
                      Witness the incredible determination, commitment, and unwavering dedication that our clients embody as they conquer their fitness milestones.
                      Be inspired by their remarkable achievements and let their success stories ignite your own motivation.
                      Join us on this transformative path and let us help you turn your aspirations into reality!
                    </TextBoxContent>
                  </TextBoxContainer>
                </Slide>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Slide right duration={1000}>
                  <StatsPieChart />
                </Slide>
              </Box>
            </StatsRowContainer>
            <Box sx={{ width: '50%', backgroundColor: 'white' }}>
              <Divider />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
              <Box sx={{ width: '50%' }}>
                <Slide left duration={1000}>
                  <AgeStat />
                </Slide>
              </Box>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                <Slide right duration={1000}>
                  <TextBoxContainer>
                    <TextBoxContent>
                      Embrace a healthier and fitter lifestyle at our gym!
                      Join a thriving community where individuals aged 45-60 dominate, showcasing the incredible transformations and successes achieved through our specialized programs.
                      Experience the power of regular exercise, unlock your potential, and redefine fitness at any age.
                      Take the first step towards a healthier future with us!
                    </TextBoxContent>
                  </TextBoxContainer>
                </Slide>
              </Box>
            </Box>
          </StatsContainer>
          <Team />
        </Parallax>
      </ParallaxContainer>
    </LandingContainer>
  );
};

export default Landing;
