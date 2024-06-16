import styled from "styled-components";
import { primaryColor } from "../../config/constants/styleConstants";

export const Button = styled.button`
  cursor: pointer;
  box-shadow: 2px 2px 0px black;
  background-color: ${primaryColor};
  user-select: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;

  &:hover {
    box-shadow: 1px 1px 0px black;
    transform: translate(1px, 1px);
  }
`;
