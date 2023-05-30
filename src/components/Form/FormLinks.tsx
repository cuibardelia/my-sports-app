import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Message = styled.div`
    margin-bottom: 8px;
`;

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MultipleLinkContainer = styled(LinkContainer)`
    padding: 16px;
`;

interface IFormLinks {
  message: string;
  link: string;
  linkMessage: string;
}

export const FormLinks: React.FC<IFormLinks> = ({ message, link, linkMessage }) => (
  <MultipleLinkContainer>
    <Message>{message}</Message>
    <Link to={link}>{linkMessage}</Link>
  </MultipleLinkContainer>
);
