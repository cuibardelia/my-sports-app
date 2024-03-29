import styled from 'styled-components';

export const LogoContainer = styled.div`
  width: 110px;
  height: 110px;
  margin: 30px 55px 30px 55px;
  background-image: url("/assets/my-fit-bud.png");
  background-size: contain;
  border-radius: 4px;
`;

export const LogoSmall = styled.div`
  width: 60px;
  height: 60px;
  margin: 10px 30px 30px 30px;
  background-image: url("/assets/my-fit-bud.png.png");
  background-size: contain;
  border-radius: 4px;

  img {
    width: 100%;
    max-width: 50px;
    margin-bottom: 20px;
  }
`;
