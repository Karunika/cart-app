import React, { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import type {
    OnDragEndResponder,
    DroppableProvided,
} from 'react-beautiful-dnd';

interface props {
    dispatchFunc: any;
    droppableId?: string;
    isDropDisabled: boolean;
}

const DroppablerDiv: FC<props> = ({
    children,
    dispatchFunc,
    droppableId = `droppable`,
    isDropDisabled,
}) => {
    const dispatch = useAppDispatch();
    const dragEndHandler: OnDragEndResponder = e => {
        const { source, destination } = e;
        if (!destination) return;
        dispatch(dispatchFunc([source.index, destination.index]));
    };
    return (
        <DragDropContext onDragEnd={dragEndHandler}>
            <Droppable
                droppableId={droppableId}
                isDropDisabled={isDropDisabled}
            >
                {(provided: DroppableProvided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='relative scrollable h-full pt-2'
                    >
                        {children}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DroppablerDiv;
