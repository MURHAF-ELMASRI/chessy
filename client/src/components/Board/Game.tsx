import { useState, useEffect, memo } from "react";
import styled from "styled-components";
import initalData from "./initalBoard";
import { move } from "./MoveAlgo";
import Square from "./Square";
import { DragDropContext } from "react-beautiful-dnd";
import moveStone from "./moveStone";
import useDialog from "../../hooks/useDialog";
import useWebSocket from "../../hooks/useWebSocket";
import { Icon } from "@iconify/react";
import { type } from "./ChessIcons";
import { IconButton } from "@material-ui/core";
const Container = styled.div`
  width: 400px; //for phone with 300 screen
  height: 400px;
  display: flex;
  flex-wrap: wrap;
`;

function displayBoard(board, player) {
  if (player) return board;
  const newBoard = board.reverse().map((e) => e.reverse().map((e) => e));
  return newBoard;
}

//scan 8*8 cells   note this is for all board
function initWhereStoneCanGo(board, player) {
  //inializing stone position
  if (!board) return "";
  const initPos = {};
  board.forEach((e, i) =>
    e.forEach((x, j) => {
      if (x.stone && x.stone.color === player) {
        initPos[x.stone.id] = squareToGo(board, i, j);
      }
    })
  );
  return initPos;
}

//return list of one square where stone can go  note: this is for one square
const squareToGo = (board, i, j) => {
  return move[board[i][j].stone.type](
    board,
    board[i][j].stone.color,
    Number(i),
    Number(j)
  );
};

function handleSpicalCalse(
  player,
  board,
  src_i,
  src_j,
  dest_i,
  dest_j,
  setDialog
) {
  const movedStone = board[src_i][src_j].stone;
  if (
    movedStone.type === "king" &&
    ((player && src_j === "4") || (!player && src_j === "3")) &&
    (dest_j === "6" || dest_j === "1")
  ) {
    //removing rook from prevoious positoin
    const rook_dest_j = dest_j === "6" ? "5" : "2";
    const rook_src_j = dest_j === "6" ? "7" : "0";
    moveStone(board, 7, rook_src_j, 7, rook_dest_j);
  }
}

function handleLog(setLogs, board, src_i, src_j, dest_i, dest_j) {
  const src = board[src_i][src_j];
  const dest = board[dest_i][dest_j];
  if (!src.stone) return;
  setLogs((prev) => [
    ...prev,
    `${src.stone.color ? "white" : "black"} ${src.stone.type} moved from ${
      src.id
    } to ${dest.id} ${
      dest.stone
        ? "killed " + (dest.stone.color ? "white " : "black ") + dest.stone.type
        : ""
    }`,
  ]);
}

function Game({
  setLogs,
  player,
  mv,
  setMv,
  turn,
  setTurn,
  startGame,
  setStartGame,
}) {
  const [board, setBoard] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selected, setSelected] = useState("");
  const { setDialogState } = useDialog();
  const { webSocket } = useWebSocket();
  //scan the board and return a table of every stone with list of available square    stone --> where can go
  const [whereStoneCanGo, setWhereStoneCanGo] = useState("");
  //varible --> key: id , value : [list of availabe square to go]
  //this handle move after dragging the stone and clicking it
  //TODO : adjust the j according to the player
  const onDragStart = (result) => {
    if (turn === "wait" || turn) {
      const stoneId = result.draggableId;
      if ((player && stoneId > 16) || (!player && stoneId <= 16))
        setSelectedId(stoneId);
    }
  };

  //handle select rock
  //it remove the effect from the previous rock and add to the selected rock
  const handleClick = (e, droppableId) => {
    if (turn === "wait" || turn) {
      const { rbdDragHandleDraggableId: stoneId } = e.target.dataset;
      if ((player && stoneId > 16) || (!player && stoneId <= 16)) {
        if (selected === e.target) {
          selected.style = "border:none";
          setSelected("");
          setSelectedId("");
        } else {
          if (selected.style) selected.style = "border:none";
          e.target.style = "border:#00AFD7 2px solid";
          e.target.dataset.droppableId = droppableId;
          setSelected(e.target);
          setSelectedId(stoneId);
        }
      }
    }
  };

  /**
   *
   * @param {Object} result dnd returned value
   * @param {Object} result.destination
   * @param {string} result.destination.droppableId
   * @param {Object} result.source
   * @param {string} result.source.droppableId
   */
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    const [src_i, src_j] = source.droppableId.split(",");
    const [dest_i, dest_j] = destination.droppableId.split(",");
    const movedStone = board[src_i][src_j].stone;

    const newState = board.map((e) => e.map((e2) => ({ ...e2 })));

    handleSpicalCalse(player, newState, src_i, src_j, dest_i, dest_j);

    moveStone(newState, src_i, src_j, dest_i, dest_j);

    setBoard(newState);
    if (selected) selected.style = "border:none";
    setSelectedId("");
    handleLog(setLogs, board, src_i, src_j, dest_i, dest_j);
    if (turn !== "wait") setTurn(false);

    const move = {
      src: { i: src_i, j: src_j },
      dest: { i: dest_i, j: dest_j },
    };
    
    webSocket.send(
      JSON.stringify({
        msg: "move",
        //TODO: change this to move{src:{i,j},dest:{i,j}}
        move,
      })
    );
    if (dest_i === "0" && movedStone.type === "pawn") {
      setDialogState({
        open: true,
        title: "replace with",
        content: (
          <>
            {["queen", "rook", "knight", "bishop", "pawn"].map((e) => (
              <IconButton
                onClick={() => {
                  setBoard((prev) => {
                    const newState = [...prev];
                    newState[dest_i][dest_j].stone.type = e;
                    return newState;
                  });
                  setDialogState({
                    open: false,
                    content: "",
                  });
                }}
              >
                <Icon icon={type[e]} />
              </IconButton>
            ))}
          </>
        ),
      });
    }

    return;
  };

  //to unSelect the selected rock when clicking outside and inside component
  useEffect(() => {
    function removeSelect(event) {
      let rbdDroppableId = event.target.dataset.rbdDroppableId;
      if (!rbdDroppableId)
        rbdDroppableId =
          event.target.parentElement.parentElement.dataset.rbdDroppableId;

      if (selected && rbdDroppableId) {
        const { i: src_i, j: src_j } = selected.dataset;
        const [, , dest_id] = rbdDroppableId.split(",");
        selected.style = "border:none";
        const stoneToMove = board[src_i][src_j].stone;
        if (whereStoneCanGo[stoneToMove.id].includes(dest_id)) {
          const result = {
            destination: {
              droppableId: rbdDroppableId,
            },
            source: {
              droppableId: `${src_i},${src_j},${stoneToMove.id}`,
            },
          };
          onDragEnd(result);
        } else {
          selected.style = "border:none";
          setSelected("");
          setSelectedId("");
        }
      }
    }

    document.addEventListener("mousedown", removeSelect);
    return () => {
      document.removeEventListener("mousedown", removeSelect);
    };
  }, [selected]);

  //connect with server logic
  useEffect(() => {
    if (mv) {
      const { src_i, src_j, dest_i, dest_j } = mv;
      handleLog(setLogs, board, 7 - src_i, 7 - src_j, 7 - dest_i, 7 - dest_j);
      const newState = board.map((e) => e.map((e2) => ({ ...e2 })));
      moveStone(newState, 7 - src_i, 7 - src_j, 7 - dest_i, 7 - dest_j);
      setBoard(newState);
      setTurn(true);
    }
  }, [mv]);

  // check if play lose
  useEffect(() => {
    let c = Object.keys(whereStoneCanGo).length !== 0 && true;
    for (const key in whereStoneCanGo) {
      if (Object.hasOwnProperty.call(whereStoneCanGo, key)) {
        const element = whereStoneCanGo[key];
        if (element.length !== 0) {
          c = false;
          break;
        }
      }
    }
    if (c) {
      webSocket.send(JSON.stringify({ msg: "lose" }));
      setLogs((prev) => [...prev, "PLAYER ONE LOSS"]);
    }
  }, [setLogs, whereStoneCanGo]);

  useEffect(() => {
    if (startGame) {
      setBoard(displayBoard(initalData, player));
      setStartGame(false);
    }
  }, [startGame]);

  useEffect(() => {
    setBoard(displayBoard(initalData, player));
  }, []);

  useEffect(() => {
    setWhereStoneCanGo(initWhereStoneCanGo(board, player));
  }, [board, player]);
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Container>
        {board &&
          board.map((e, i) =>
            e.map((e, j) => {
              return (
                <Square
                  isDropDisabled={
                    selectedId && whereStoneCanGo[selectedId]
                      ? !whereStoneCanGo[selectedId].includes(e.id)
                      : true
                  } //allow drag if the square is included
                  handleClick={handleClick}
                  white={e.color}
                  id={e.id}
                  key={e.id}
                  i={i}
                  j={j}
                  stone={e.stone ? e.stone : null}
                />
              );
            })
          )}
      </Container>
    </DragDropContext>
  );
}
export default memo(Game);
