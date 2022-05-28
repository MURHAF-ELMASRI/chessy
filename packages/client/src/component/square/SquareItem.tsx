import { color } from "src/constants/color";
import { Color } from "src/types/Color";
import styled from "styled-components";

interface SquareItemProps {
  color2: Color;
  selected: boolean;
}

//TODO: set color if position of selected is equal of square position
export const SquareItem = styled.div<SquareItemProps>`
  display: flex;
  justify-content: center;
  width: 12.5%;
  height: 12.5%;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) =>
    props.color2 === color.white ? "#F2A365" : "#30475E"};
  filter: ${(props) =>
    props.selected ? " drop-shadow(2px 2px 10px red) invert(75%);" : ""};
`;

export default SquareItem;
