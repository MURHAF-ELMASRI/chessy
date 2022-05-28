import { memo } from "react";
import styled from "styled-components";
import Square from "../../component/square/Square";

import { useAppSelector } from "src/hooks/useAppSelector";

//whereStoneCanGo save object of stones id
function Game() {
  const board = useAppSelector((state) => state.gameState.board);

  return (
    <Container>
      {board.board &&
        board.board.map((e, i) =>
          e.map((e, j) => <Square key={i + "," + j} position={{ i, j }} />)
        )}
    </Container>
  );
}
export default memo(Game);

const Container = styled.div`
  width: 400px; //for phone with 300 screen
  height: 400px;
  display: flex;
  flex-wrap: wrap;
`;
