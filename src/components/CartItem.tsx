import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { editCart, removeCart, save } from '../feature/cartSlice';
import { I_Cart } from '../global';

import { useUnloadCautionPrompt } from '../app/hooks';

import moment from 'moment';

import {
    BiGridVertical,
    BiRename,
    BiCheck,
    BiTrash,
    BiX,
} from 'react-icons/bi';

import Tooltip from './utils/Tooltip';
import DndTable from './utils/DndTable';

interface props {
    cart: I_Cart;
    dndDisabled: boolean;
}

const CartItem: FC<props> = ({
    cart: { _id, name, dateCreated, lastModified, itemsSeq },
    dndDisabled,
}) => {
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const [editableName, setEditableName] = useState(name);
    const [editing, setEditing] = useState(false);

    const deleteHandler = () => {
        dispatch(removeCart(_id));
        dispatch(save());
    };

    const editClickHandler = () => {
        setEditing(prev => !prev);
    };

    const saveClickHandler = () => {
        editClickHandler();
        dispatch(editCart([_id, editableName]));
        dispatch(save());
    };

    const discardClickHandler = () => {
        setEditableName(name);
        editClickHandler();
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 32) setEditableName(e.target.value);
    };

    useEffect(() => {
        if (editing && inputRef && inputRef.current) inputRef.current.focus();
    }, [editing]);

    useUnloadCautionPrompt(editing);

    return (
        <>
            <DndTable.Data>
                <span
                    className={`icons ml-0 ${
                        dndDisabled ? `cursor-not-allowed` : `cursor-grab`
                    }`}
                >
                    <Tooltip
                        content={`drag ${dndDisabled ? `(disabled)` : ``}`}
                    >
                        <BiGridVertical />
                    </Tooltip>
                </span>
            </DndTable.Data>

            <DndTable.Data>
                <NavLink
                    to={editing || !dndDisabled ? `#` : `cart/${_id}`}
                    className={`w-full ${
                        !dndDisabled ? `pointer-events-none` : ``
                    }`}
                >
                    <input
                        className={`w-full text-xl bg-transparent focus:outline-0 bg-slate-200 disabled:bg-transparent p-1
                                ${
                                    editing
                                        ? ``
                                        : `hover:underline hover:text-cyan-700 hover:cursor-pointer`
                                }`}
                        ref={inputRef}
                        onChange={changeHandler}
                        value={editableName}
                        disabled={!editing}
                    />
                </NavLink>
            </DndTable.Data>

            <DndTable.Data>
                <Tooltip content={moment(dateCreated, `x`).calendar()}>
                    <span className='text-slate-400 text-center w-60 block'>
                        {moment(dateCreated, `x`).format(`D/M/YYYY (h:mm a)`)}
                    </span>
                </Tooltip>
            </DndTable.Data>

            <DndTable.Data>
                <Tooltip content={moment(lastModified, `x`).calendar()}>
                    <span className='text-slate-400 text-center w-60 lg:block hidden'>
                        {moment(lastModified, `x`).format(`D/M/YYYY (h:mm a)`)}
                    </span>
                </Tooltip>
            </DndTable.Data>

            <DndTable.Data>
                <Tooltip content={`` + itemsSeq.length}>
                    <span className='w-24 text-xl text-center inline-block truncate'>
                        {itemsSeq.length}
                    </span>
                </Tooltip>
            </DndTable.Data>

            <DndTable.Data>
                {editing ? (
                    <Tooltip content='save'>
                        <BiCheck className='green' onClick={saveClickHandler} />
                    </Tooltip>
                ) : (
                    <Tooltip content='rename cart'>
                        <BiRename onClick={editClickHandler} />
                    </Tooltip>
                )}
            </DndTable.Data>

            <DndTable.Data>
                {editing ? (
                    <Tooltip content='discard'>
                        <BiX className='red' onClick={discardClickHandler} />
                    </Tooltip>
                ) : (
                    <Tooltip content='delete'>
                        <BiTrash className='red' onClick={deleteHandler} />
                    </Tooltip>
                )}
            </DndTable.Data>
        </>
    );
};

export default CartItem;
