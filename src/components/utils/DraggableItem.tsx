import React, { FC } from "react";

import { Draggable } from 'react-beautiful-dnd';

import type { DraggableProvided } from 'react-beautiful-dnd';

interface props {
    draggableId: string,
    dndDisabled: boolean,
    index: number,
    className?: string
}

const DraggableItem: FC<props> = ({ children, draggableId, dndDisabled, index, className }) => {
    return (
        <Draggable draggableId={draggableId} isDragDisabled={dndDisabled} index={index}>
            {(provided: DraggableProvided) => (
                <div
                    className={`flex-center border-y-[2px] mt-[-2px] py-4 bg-slate-50 ${className}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {children}
                </div>
            )}
        </Draggable>
    )
}

export default DraggableItem;