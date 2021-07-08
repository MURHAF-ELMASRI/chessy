import { color } from "@constants/color";
import { Color } from "@type/Color";
import styled from "styled-components";
interface StoneItemProps {
  color2: Color;
}

export const StoneItem = styled.div<StoneItemProps>`
  color: ${(props) => (props.color2 === color.white ? "#FDFDFD" : "black")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
