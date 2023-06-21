import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CodeIcon from '@mui/icons-material/Code';

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: '300px',
  color: theme.palette.text.primary,
}));

const ColoredIcon = styled(Box)<{ color: any }>(({ color }) => ({
  color,
}));

//            Join our gym and be part of our thriving community, where people of all fitness levels come together to achieve their goals.
//             Our team of certified trainers has years of experience and expertise to guide you through personalized training programs.
//             Discover a wide range of exercises tailored to your preferences, including strength training, cardio, yoga, and more.

const ObjectiveStat = () => {
  const stats = [
    {
      icon: (
        <ColoredIcon color={(theme) => theme.palette.primary.dark}>
          <FitnessCenterIcon fontSize="large" />
        </ColoredIcon>
      ),
      text: 'Our trainers design custom workout plans based on your goals, fitness level, and preferences, ensuring maximum results.',
    },
    {
      icon: (
        <ColoredIcon color={(theme) => theme.palette.secondary.main}>
          <DirectionsRunIcon fontSize="large" />
        </ColoredIcon>
      ),
      text: ' Join our energizing group fitness classes led by experienced instructors, offering a fun and motivating environment.',
    },
    {
      icon: (
        <ColoredIcon color={(theme) => theme.palette.secondary.light}>
          <CodeIcon fontSize="large" />
        </ColoredIcon>
      ),
      text: 'We provide state-of-the-art equipment and advanced technology to enhance your training experience and track your progress.',
    },
  ];

  return (
    <Box display="flex" justifyContent="space-between" maxWidth="800px">
      {stats.map((stat, index) => (
        <StatBox key={index}>
          {stat.icon}
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {stat.text}
          </Typography>
        </StatBox>
      ))}
    </Box>
  );
};

export default ObjectiveStat;
