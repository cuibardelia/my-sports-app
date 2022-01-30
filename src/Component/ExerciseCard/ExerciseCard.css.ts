import styled from 'styled-components';

const radius = 10;

export const CardContainer = styled.div`
    width: 210px;
    height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
    border-radius: ${radius}px;
    background: #DAD299;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, rgba(176, 218, 185, 0.5), rgba(218, 210, 153, 0.5));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, rgba(176, 218, 185, 0.5), rgba(218, 210, 153, 0.5)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export const CardInner = styled.div`
    width: 80%;
    height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
    border-radius: ${radius}px;
    border: 6px solid #3d4978;
`;

export const Snap = styled.div<{ path: string}>`
  width: 80%;
  height: 80%;
  background-image: url(${(props) => props.path});
  background-size: contain;

`;
