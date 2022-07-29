import React, { FC } from 'react';
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
    OnDragEndResponder,
} from 'react-beautiful-dnd';
import { useAppDispatch } from '../../../app/hooks';

import { useDndTableContext } from './context';

export interface IDndBody {
    dispatchFn: any;
    droppableId?: string;
    isDropDisabled: boolean;
}

const DndBody: FC<IDndBody> = ({
    children,
    dispatchFn,
    droppableId = `droppable`,
    isDropDisabled,
}) => {
    useDndTableContext();
    const onDragEndHandler: OnDragEndResponder = e => {
        const dispatch = useAppDispatch();
        const { source, destination } = e;
        if (!destination) return;
        dispatch(dispatchFn([source.index, destination.index]));
    };
    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
            <Droppable
                droppableId={droppableId}
                isDropDisabled={isDropDisabled}
            >
                {(provided: DroppableProvided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                        {children}

                        {provided.placeholder}
                    </tbody>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DndBody;
