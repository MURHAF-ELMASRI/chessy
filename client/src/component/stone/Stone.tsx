import styled  from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from '@iconify/react';
import  {type}  from '../Board/ChessIcons';
const StoneItem = styled.div`
    color: ${(props) => (props.white ? '#FDFDFD' : 'black')};
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

//ToDo:after stone have been render there is no need to rerender it all the game except when pawn change to another stone
const Stone = ({ stone, handleClick, i, j }) => {
    return (
        <Draggable index={0} draggableId={stone.id}>
            {(provide) => (
                <>
                    <StoneItem
                        {...provide.draggableProps}
                        ref={provide.innerRef}
                        white={stone.color}
                    >
                        <Icon width={20} icon={type[stone.type]} />
                        <DragHandler
                            data-i={i}
                            data-j={j}
                            {...provide.dragHandleProps}
                            onClick={(e) => handleClick(e)}
                            onDrag={(e) => handleClick(e)}
                        />
                    </StoneItem>
                </>
            )}
        </Draggable>
    );
};
export default Stone;