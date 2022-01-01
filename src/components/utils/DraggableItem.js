import React from "react";

import { Draggable } from 'react-beautiful-dnd';

const DraggableItem = ({ children, draggableId, dndDisabled, index, className }) => {
    return (
        <Draggable draggableId={draggableId} isDragDisabled={dndDisabled} index={index}>
            {provided => (
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