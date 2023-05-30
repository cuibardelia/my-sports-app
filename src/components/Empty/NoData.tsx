import React from 'react';
import NoDataCard from './NoDataCard';
import { Container, ContentContainer } from '../PageContainer.css';
import DefaultButton from '../Button/DefaultButton';

interface INoData {
  message: string;
  buttonText?: string;
  link?: string;
}

const NoData: React.FC<INoData> = ({ message, link, buttonText }) => (
  <Container>
    <NoDataCard message={message} />
    {buttonText && (
    <ContentContainer>
      <DefaultButton link={link} text={buttonText} />
    </ContentContainer>
	  )}
  </Container>
);

export default NoData;
