import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DraggableItem from './utils/DraggableItem';

import { useDispatch } from 'react-redux';
import { removeCart, editCart, save } from '../feature/cartSlice';
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

interface props {
    cart: I_Cart;
    index: number;
    dndDisabled: boolean;
    fs: boolean;
}

const CartItem: FC<props> = ({
    cart: { _id, name, dateCreated, lastModified, itemsSeq },
    index,
    dndDisabled,
    fs,
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
        <DraggableItem
            draggableId={_id}
            index={index}
            dndDisabled={dndDisabled}
            className={fs ? `py-4` : `py-2 border-slate-50`}
        >
            <span className='flex-center flex-1'>
                {fs && (
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
                )}
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
            </span>
            {fs && (
                <span className='flex flex-row'>
                    <span className='flex-center cursor-default text-sm'>
                        <Tooltip content={moment(dateCreated, `x`).calendar()}>
                            <span className='text-slate-400 text-center w-60 block'>
                                {moment(dateCreated, `x`).format(
                                    `D/M/YYYY (h:mm a)`
                                )}
                            </span>
                        </Tooltip>
                        <Tooltip content={moment(lastModified, `x`).calendar()}>
                            <span className='text-slate-400 text-center w-60 lg:block hidden'>
                                {moment(lastModified, `x`).format(
                                    `D/M/YYYY (h:mm a)`
                                )}
                            </span>
                        </Tooltip>
                        <Tooltip content={`` + itemsSeq.length}>
                            <span className='w-24 text-xl text-center inline-block truncate'>
                                {itemsSeq.length}
                            </span>
                        </Tooltip>
                    </span>
                    <span className='icons-r'>
                        {editing ? (
                            <>
                                <Tooltip content='save'>
                                    <BiCheck
                                        className='green'
                                        onClick={saveClickHandler}
                                    />
                                </Tooltip>
                                <Tooltip content='discard'>
                                    <BiX
                                        className='red'
                                        onClick={discardClickHandler}
                                    />
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Tooltip content='rename cart'>
                                    <BiRename onClick={editClickHandler} />
                                </Tooltip>
                                <Tooltip content='delete'>
                                    <BiTrash
                                        className='red'
                                        onClick={deleteHandler}
                                    />
                                </Tooltip>
                            </>
                        )}
                    </span>
                </span>
            )}
        </DraggableItem>
    );
};

export default CartItem;
