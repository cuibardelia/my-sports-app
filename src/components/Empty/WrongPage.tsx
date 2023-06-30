import React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { NotFoundPageContainer } from '../PageContainer.css';
import { useAuthContext } from '../../Providers/AuthContext';
import { getDefaultRoute } from '../../helpers/fnPaths';

const NotFoundMessage = styled('main')`
  color: #5B4FD8; 
  font-size: 24px;
  margin: 16px;
  text-align: center;
`;

const AvocadoImage = styled('img')`
  display: block;
  margin: 16px auto;
  width: 100px;
  height: 100px;
`;

const CenteredContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
interface IWrongPage {
  message: string;
  buttonMessage: string;
}

const WrongPage: React.FC<IWrongPage> = ({ message, buttonMessage }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleGoToMain = () => {
    const mainRoute = user ? getDefaultRoute(user.userType) : '/';
    navigate(mainRoute);
  };

  return (
    <NotFoundPageContainer>
      <NotFoundMessage>
        {`${message} `}
      </NotFoundMessage>
      <AvocadoImage src="/assets/my-fit-bud.png" alt="Avocado" />
      <CenteredContainer>
        <Button variant="contained" color="primary" onClick={handleGoToMain}>
          {buttonMessage}
        </Button>
      </CenteredContainer>
    </NotFoundPageContainer>
  );
};

export default WrongPage;
