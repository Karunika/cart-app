import React, { FC } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

export interface IDndRow {
    draggableId: string;
    dndDisabled: boolean;
    index: number;
    className?: string;
}

const DndRow: FC<IDndRow> = ({
    children,
    draggableId,
    dndDisabled,
    index,
    className,
}) => {
    return (
        <Draggable
            draggableId={draggableId}
            isDragDisabled={dndDisabled}
            index={index}
        >
            {(provided: DraggableProvided) => (
                <tr
                    className={`border-y-[1px] mt-[-2px] py-2 bg-slate-50 ${className}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {children}
                </tr>
            )}
        </Draggable>
    );
};

export default DndRow;
