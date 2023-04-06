import styled from 'styled-components';

// TODO: 1. types
// TODO: cannot do without rem
// TODO: Mobile design
// TODO: Variables

export const Label = styled.label`  
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: darkslategray;
`;

export const FormInput = styled.input`
  width: 250px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
`

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
`
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
	margin-bottom: 20px;
  }
  a {
    color: #4CAF50;
  }
`