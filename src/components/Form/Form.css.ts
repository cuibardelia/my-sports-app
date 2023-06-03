import styled from 'styled-components';

// TODO: 1. types
// TODO: cannot do without rem
// TODO: Mobile design
export const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  
  &:hover {
    background-color: #45a049;
  }
`;
// TODO: must create a common components file
const Card = styled.div` 
  width: max-content;
  padding: 80px;
  border-radius: 5%;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;

export const AuthCard = styled(Card)`
`;

export const BottomLinks = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #30424D; 
  div {
	flex-basis: 45%;
  }
  a {
    color: #4CAF50;
  }
`;

export const FormRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '16px',
});

export const FormColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginRight: '16px',
});

export const Delimiter = styled('div')({
  width: '1px',
  height: '100%',
  backgroundColor: '#ccc',
  margin: '0 16px',
});
