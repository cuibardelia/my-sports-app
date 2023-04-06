import styled from 'styled-components';


export const SideContainer = styled.nav`
  width: 250px;
  height: 100%;
  background-color: #f1f1f1;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  z-index: 4;
  
  ul {
    list-style-type: none;
    margin-left: auto;
    margin-right: 40px;
    order: 2;
    
    a {
      text-decoration: none;
      color: #9dd45b;
      transition: color 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
      font-size: 24px;
      font-weight: 700;

      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      &:hover {
        color: #9b82ed;
      }
	  
	  &:last-child {
        border-bottom: none;
      }
    }
`;

export const MenuItem = styled.li`
    padding: 5px 10px;
  font-size: 22px;
`

export const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 10px 30px 30px 30px;
  background-image: url("assets/avo-cardio.png");
  background-size: contain;
  border-radius: 4px;

  img {
    width: 100%;
    max-width: 120px;
    margin-bottom: 20px;
  }
`;

export const Greeting = styled.div`
  margin: 30px 20px 30px 20px;
  font-weight: bold;

`

export const SideMenuContainer = styled.div`
  	margin: 30px 10px 30px 10px;
`;

