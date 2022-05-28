import { InlineIcon } from "@iconify/react";
import stone from "src/core/models/stone/stone";
import { StoneItem } from "./StoneItem";

interface Props {
  stone: stone;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

//ToDo:after stone have been render there is no need to render it all the game except when pawn change to another stone
const Stone = ({ stone, handleClick }: Props) => {
  return (
    <StoneItem onClick={handleClick} color2={stone.color}>
      <InlineIcon width={20} icon={stone.icon} />
    </StoneItem>
  );
};
export default Stone;
