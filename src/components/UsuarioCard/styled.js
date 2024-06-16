import styled from 'styled-components';
import { secundaryColor } from '../../config/constants/styleConstants';

export const Container = styled.div`
  width: 100%;
  background-color: ${secundaryColor};
  border-style: dashed;
  box-shadow: 10px 10px 10px black;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  button {
    width: 25%;
  }

`;
