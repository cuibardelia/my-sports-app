import styled from 'styled-components';

export const StyledCard = styled.div`
  width: 70%;
  height: 70%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.2);
    background-color: #f1f1f1;
  }
`;
