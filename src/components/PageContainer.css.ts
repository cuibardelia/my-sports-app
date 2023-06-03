import styled from 'styled-components';

// FIXME: containers & Font
export const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0 100px 50px 290px;
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

export const StepsContainer = styled(Container)(() => ({
  height: '66vh',
  width: '66vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
