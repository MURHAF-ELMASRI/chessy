import { Color } from "@type/Color";
import styled, { StyledFunction } from "styled-components";

interface SquareItemProps {
  color: Color;
  selected: boolean;
}
const div: StyledFunction<SquareItemProps & React.HTMLProps<HTMLDivElement>> =
  styled.div;

function styledComponentWithProps<T, U extends HTMLElement = HTMLElement>(
  styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
  return styledFunction;
}

//TODO: set color if position of selected is equal of square position
const SquareItem = styledComponentWithProps<SquareItemProps, HTMLDivElement>(styled.div`
  display: flex;
  justify-content: center;
  width: 12.5%;
  height: 12.5%;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) => (props.color.white ? "#F2A365" : "#30475E")};
  filter: ${(props) =>
    props.selected ? " drop-shadow(2px 2px 10px red) invert(75%);" : ""};
`);

export default SquareItem;
