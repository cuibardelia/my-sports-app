import styled, { keyframes } from 'styled-components';

// FIXME: containers & Font
export const PageContainer = styled.div`
  width: 100vw;
  padding: 0 50px 50px 280px;
`;

export const NotFoundPageContainer = styled(PageContainer)`
  padding: 100px;
`;

export const AdminPageContainer = styled.div`
  padding: 100px 100px;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  margin-top: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
`;

export const StepsContainer = styled(Container)(() => ({
  height: '66vh',
  width: '66vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const colorAnimation = keyframes`
  0% {
    background-color: #9dd45b;
  }
  25% {
    background-color: #8884d8;
  }
  50% {
    background-color: #5F852D;
  }
  75% {
    background-color: #5a5487;
  }
  100% {
    background-color: #9dd45b;
  }
`;

export const AnimationContainer = styled.div`
  height: 20vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, transparent, #f5f5f5);
  animation: ${colorAnimation} 4s linear infinite;
`;
