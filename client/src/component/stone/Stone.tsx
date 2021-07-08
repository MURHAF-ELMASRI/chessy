import styled from "styled-components";
import { Icon } from "@iconify/react";
import stone from "@models/stone/stone";

const StoneItem = styled.div`
  color: ${(props) => (props.white ? "#FDFDFD" : "black")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const DragHandler = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  margin: auto;
`;

interface Props {
  stone: stone;
  handleClick: () => void;
}

//ToDo:after stone have been render there is no need to render it all the game except when pawn change to another stone
const Stone = ({ stone, handleClick }: Props) => {
  return (
    <StoneItem white={stone.color}>
      <Icon width={20} icon={stone.icon} />
      <DragHandler onClick={handleClick} />
    </StoneItem>
  );
};
export default Stone;
