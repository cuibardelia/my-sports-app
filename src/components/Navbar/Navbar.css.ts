import styled from 'styled-components';

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 3;
  padding-top: 30px;
  font-size: 13px;
  
  ul {
    list-style-type: none;
    margin-left: auto;
    margin-right: 40px;
    order: 2;

    a {
      text-decoration: none;
    }
  }
`;

export const MenuItem = styled.li`
    padding: 5px 10px;
    display: inline;
	  color: #9dd45b;
	  transition: color 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
	  font-size: 24px;
	  font-weight: 700;

  &:hover {
    color: #9b82ed;
  }
`;
