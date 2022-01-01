import React from 'react';
import { useDispatch } from 'react-redux';
import { refresh, save } from '../../store/feature/cartSlice';

import { BiSave, BiMove } from 'react-icons/bi';

import Tooltip from './Tooltip';

const DndEditTools = ({ editingMode, setEditingMode }) => {
    const dispatch = useDispatch();
    const editSaveClickHandler = e => {
        if(editingMode) dispatch(save());
        setEditingMode(prev => !prev);
    }
    const discardClickHandler = e => {
        dispatch(refresh());
        setEditingMode(false);
    }
    return (
        <>
            {editingMode ?
                <>
                    <Tooltip content='save'>
                        <BiSave onClick={editSaveClickHandler} />
                    </Tooltip>
                    <button onClick={discardClickHandler}
                        className='ml-4 mr-2 text-red-400 hover:text-red-500 hover:underline'>discard</button>
                </>
                :
                <Tooltip content='rearrange items'>
                    <BiMove onClick={editSaveClickHandler} />
                </Tooltip>
            }
        </>
    )
}

export default DndEditTools;