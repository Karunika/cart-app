import React, { FC, Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { refresh, save } from '../../feature/cartSlice';

import { BiSave, BiMove } from 'react-icons/bi';

import Tooltip from './Tooltip';

interface props {
    editingMode: boolean;
    setEditingMode: Dispatch<SetStateAction<boolean>>;
}

const DndEditTools: FC<props> = ({ editingMode, setEditingMode }) => {
    const dispatch = useAppDispatch();
    const editSaveClickHandler = () => {
        if (editingMode) dispatch(save());
        setEditingMode(prev => !prev);
    };
    const discardClickHandler = () => {
        dispatch(refresh());
        setEditingMode(false);
    };
    return (
        <>
            {editingMode ? (
                <>
                    <Tooltip content='save'>
                        <BiSave onClick={editSaveClickHandler} />
                    </Tooltip>
                    <button
                        onClick={discardClickHandler}
                        className='ml-4 mr-2 text-red-400 hover:text-red-500 hover:underline'
                    >
                        discard
                    </button>
                </>
            ) : (
                <Tooltip content='rearrange items'>
                    <BiMove onClick={editSaveClickHandler} />
                </Tooltip>
            )}
        </>
    );
};

export default DndEditTools;
