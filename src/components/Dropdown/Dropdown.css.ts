import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownHeader = styled.div`
  background-color: #f2f2f2;
  color: #333;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export const DropdownList = styled.ul`
  position: absolute;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DropdownListItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;
