import React from 'react';
import Typewriter from 'typewriter-effect';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyTitleMessage = styled.h1`
  position: absolute;
  width: 100%;
  top: 22rem;
  z-index: 1;
  margin-top: -125px;
  text-align: center;
  color: #F5F5F5;
  strong {
    font-size: 1.25em;
  }
  div {
    color: ${(props) => props.theme.titleColor};
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
    font-weight: 100;
    .main {
      font-size: 50px;
    }
    .sub {
      font-size: 27px;
      letter-spacing: 2px;
    }
  }
`;

const ButtonContainer = styled.div`
    margin-top: 5rem;
`;

const TitleMessage = () => {
  const navigate = useNavigate();
  const onJoinClick = () => {
    navigate('/auth/register');
  };
  return (
    <MyTitleMessage>
      <div className="titleMessage">
        <div className="heading">
          <div className="main text-center mb-3">
            Welcome to your journey with
            <br />
            <span>
              <strong>MyGymBud</strong>
            </span>
          </div>
          <div className="sub">
            <Typewriter
              options={{
                strings: ['Your community', 'Your support', 'Your objectives'],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </div>
        </div>
      </div>
      <ButtonContainer>
        <Button onClick={onJoinClick} variant="outlined" color="primary">
          Join us
        </Button>
      </ButtonContainer>
    </MyTitleMessage>
  );
};
export default TitleMessage;
