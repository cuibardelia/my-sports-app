import * as React from 'react';
import { Parallax } from 'react-parallax';
import styled from 'styled-components';

const SectionContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #f9f9f9 0%, #eaeaea 100%);
    transform: skewY(-20deg);
    transform-origin: 0;
    z-index: -1;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 2rem;
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #eaeaea;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const Landing = () => (
  <Parallax bgImage="assets/landing.jpg" bgImageAlt="My Fit Bud" strength={300}>
    <SectionContainer>
      <LeftSection>
        <Title>Welcome to FitBud</Title>
        <Description>Your fitness in our community journey starts here!</Description>
      </LeftSection>
      <RightSection>
        <Title>About Us</Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum,
          neque nec posuere laoreet, dolor sem malesuada lectus, a tristique purus
          odio at velit.
        </Description>
      </RightSection>
    </SectionContainer>

    <SectionContainer>
      <RightSection>
        <Title>Our Services</Title>
        <Description>
          Fusce finibus lacinia est, sed faucibus mauris feugiat at. Sed auctor dui
          et lacus vestibulum convallis. Mauris vitae tellus eget ligula efficitur
          fermentum. Nunc eleifend felis ac ligula pulvinar, a suscipit mauris
          porttitor.
        </Description>
      </RightSection>
      <LeftSection>
        <Title>Contact Us</Title>
        <Description>
          Praesent finibus lectus id gravida semper. Nam maximus pulvinar mi a
          dapibus. Nulla tincidunt neque vel dapibus iaculis. Donec maximus
          ullamcorper turpis, ac ullamcorper mi commodo ac.
        </Description>
      </LeftSection>
    </SectionContainer>
  </Parallax>
);

export default Landing;
