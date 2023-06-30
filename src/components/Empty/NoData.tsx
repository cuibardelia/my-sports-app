import React from 'react';
import NoDataCard from './NoDataCard';
import { Container, ContentContainer, SmallContainer } from '../PageContainer.css';
import DefaultButton from '../Button/DefaultButton';

interface INoData {
  message: string;
  buttonText?: string;
  link?: string;
  isPage?: boolean;
}

const NoData: React.FC<INoData> = ({
  message = '', link = '', buttonText = '', isPage = false,
}) => (
  <>
    {isPage ? (
      <Container>
        <NoDataCard message={message} />
        {buttonText && (
        <ContentContainer>
          <DefaultButton link={link} text={buttonText} />
        </ContentContainer>
        )}
      </Container>
    ) : (
      <SmallContainer>
        <NoDataCard message={message} />
        {buttonText && (
        <ContentContainer>
          <DefaultButton link={link} text={buttonText} />
        </ContentContainer>
        )}
      </SmallContainer>
    )}
  </>
);

export default NoData;
