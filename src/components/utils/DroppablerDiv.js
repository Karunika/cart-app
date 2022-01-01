import React from 'react';
import { useDispatch } from 'react-redux';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DroppablerDiv = ({ children, dispatchFunc, droppableId = `droppable`, isDropDisabled }) => {
    const dispatch = useDispatch();
    const dragEndHandler = e => {
        const { source, destination } = e;
        if(!destination) return;
        dispatch(dispatchFunc([source.index, destination.index]));
    }
    return (
        <DragDropContext onDragEnd={dragEndHandler}>
            <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
                {provided => (
                    <div ref={provided.innerRef}
                        {...provided.dragProps}
                        className='relative scrollable h-full pt-2'>

                            {children}
                            
                            {provided.placeholder}

                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DroppablerDiv;