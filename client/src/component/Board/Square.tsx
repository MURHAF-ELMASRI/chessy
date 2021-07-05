import { useEffect } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Stone from './Stone';

//ToDo: optimize the component to not render if there is no change
//ToDo: make item droppable and the stone draggable
//ToDo : put id the the draggabel and droppabel

const SQItem = styled.div`
    display: flex;
    justify-content: center;
    width: 12.5%;
    height: 12.5%;
    align-items: center;
    overflow: hidden;
    background-color: ${(props) => (props.white ? '#F2A365' : '#30475E')};
    filter: ${(props) =>
        props.selected ? ' drop-shadow(2px 2px 10px red) invert(75%);' : ''};
`;

const Square = ({ white, id, stone, handleClick, j, i, isDropDisabled }) => {
    useEffect(() => {}, [stone, isDropDisabled]);

    return (
        <Droppable
            droppableId={i + ',' + j + ',' + id}
            isDropDisabled={isDropDisabled}
        >
            {(provide) => (
                <SQItem
                    {...provide.droppableProps}
                    ref={provide.innerRef}
                    white={white}
                    selected={!isDropDisabled}
                >
                    {stone && (
                        <Stone
                            handleClick={(e) =>
                                handleClick(e, i + ',' + j + ',' + id)
                            }
                            stone={stone}
                            i={i}
                            j={j}
                        />
                    )}
                    {provide.placeholder}
                </SQItem>
            )}
        </Droppable>
    );
};
export default Square;
