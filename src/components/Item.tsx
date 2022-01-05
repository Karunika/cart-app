import React, { FC, ChangeEvent, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useUnloadCautionPrompt } from '../app/hooks';
import {
    removeItem,
    incItem,
    decItem,
    save,
    editItem,
} from '../feature/cartSlice';
import { I_Item } from '../global';

import moment from 'moment';

import { BiGridVertical, BiPencil, BiCheck, BiTrash } from 'react-icons/bi';

import DraggableItem from './utils/DraggableItem';
import Counter from './utils/Counter';

import Tooltip from './utils/Tooltip';

interface props {
    item: I_Item;
    index: number;
    dndDisabled: boolean;
}

const Item: FC<props> = ({
    item: { _id, name, cost, dateAdded, quantity },
    index,
    dndDisabled,
}) => {
    const dispatch = useAppDispatch();
    const { cartId } = useParams();

    const inputRef = useRef<HTMLInputElement>(null);

    const [editing, setEditing] = useState(false);
    const [editableName, setEditableName] = useState<string>(name);
    const [editableCost, setEditableCost] = useState<string>(`` + cost);

    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableName(e.target.value);
        if (e.target.value.length <= 32) setEditableName(e.target.value);
    };
    const changeCostHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableCost(e.target.value);
        if (/^[0-9]*(\.[0-9]*)?$/.test(e.target.value))
            setEditableCost(e.target.value);
    };
    const deleteHandler = () => {
        dispatch(removeItem([cartId, _id]));
        dispatch(save());
    };
    const saveClickHandler = () => {
        editClickHandler();
        dispatch(editItem([cartId, _id, editableName, +editableCost]));
        dispatch(save());
    };
    const editClickHandler = () => {
        setEditing(prev => !prev);
    };

    const incHandler = () => {
        dispatch(incItem([cartId, _id]));
        dispatch(save());
    };
    const decHandler = () => {
        dispatch(decItem([cartId, _id]));
        dispatch(save());
    };
    useEffect(() => {
        if (editing && inputRef && inputRef.current) inputRef.current.focus();
    }, [editing]);
    useUnloadCautionPrompt(editing);
    return (
        <DraggableItem
            draggableId={_id}
            dndDisabled={dndDisabled}
            index={index}
        >
            <span
                className={`icons ml-0 ${
                    dndDisabled ? `cursor-not-allowed` : `cursor-grab`
                }`}
            >
                <Tooltip content={`drag ${dndDisabled ? `(disabled)` : ``}`}>
                    <BiGridVertical />
                </Tooltip>
            </span>
            <span className='flex-center flex-1'>
                <span className='w-full flex flex-col'>
                    <input
                        className={`w-full text-xl bg-transparent focus:outline-0 focus:bg-slate-200 p-1
                                ${!dndDisabled ? `pointer-events-none` : ``}`}
                        ref={inputRef}
                        onChange={changeNameHandler}
                        value={editableName}
                        disabled={!editing}
                    />
                    <span className='text-slate-300 cursor-default select-none text-sm'>
                        {moment(dateAdded, `x`).calendar()}
                    </span>
                </span>
            </span>
            <input
                onChange={changeCostHandler}
                value={editableCost}
                disabled={!editing}
                className='w-24 text-xl text-center bg-transparent focus:outline-0 focus:bg-slate-200'
            />
            <Counter
                initialValue={quantity}
                onInc={incHandler}
                onDec={decHandler}
                className='mx-4'
            />
            <span className='w-24 text-xl text-center inline-block'>
                {(quantity * cost).toFixed(2)}
            </span>
            <span className='icons-r'>
                {editing ? (
                    <Tooltip content='save'>
                        <BiCheck onClick={saveClickHandler} />
                    </Tooltip>
                ) : (
                    <Tooltip content='edit'>
                        <BiPencil onClick={editClickHandler} />
                    </Tooltip>
                )}
                <Tooltip content='delete'>
                    <BiTrash className='trash' onClick={deleteHandler} />
                </Tooltip>
            </span>
        </DraggableItem>
    );
};

export default Item;
