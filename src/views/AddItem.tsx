import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, save } from '../feature/cartSlice';

import { BiError } from 'react-icons/bi';

import Modal from '../components/utils/Modal';
import Counter from '../components/utils/Counter';

const AddItem = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef && inputRef.current)
            inputRef.current.focus();
    }, [])
    const [name, setName] = useState<string>(``);
    const [cost, setCost] = useState<string>(``);
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<string>(``);

    const { cartId } = useParams();
    const dispatch = useDispatch();

    const submitEvent = () => {
        dispatch(addItem([cartId, {
            name, cost: +cost, quantity: +quantity
        }]));
        dispatch(save());
        setName(``);
        setCost(`0`);
        setQuantity(1);
    }
    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 32) {
            setError(`Size of the name cannot exceed 32 character limit.`);
        } else {
            setName(e.target.value);
            setError(``);
        }
    }
    const changeCostHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^[0-9]*(\.[0-9]*)?$/.test(e.target.value)) {
            setCost(e.target.value);
            setError(``);
        } else {
            setError(`Invalid Cost Input. Only floats or integers allowed.`);
        }
    }
    const incQuantity = () => {
        setQuantity(prev => prev + 1);
    }
    const decQuantity = () => {
        setQuantity(prev => prev - 1);
    }
    return (
        <Modal submitEvent={submitEvent} keyword='add'>
            <h2>Add a new Item</h2>
            {error &&
                <span className='flex-center mb-10 border-red-400 border-[1px] rounded bg-red-200 w-full px-2 py-1'>
                    <BiError />
                    <span className='ml-2'>{error}</span>
                </span>
            }
            <div className='flex-center relative h-10 w-full input-component mb-6'>
                <input type='text'
                    ref={inputRef}
                    value={name}
                    name='name'
                    onChange={changeNameHandler}
                    className='h-full w-full border-gray-300 border-[2px] px-2 transition-all border-blue
                            rounded-sm bg-slate-50 focus:border-cyan-500 outline-none'
                    required
                />
                <label htmlFor='name'
                    className='absolute left-2 transition-all bg-slate-50 px-1 pointer-events-none'>
                    Name
                </label>
            </div>
            <div className='flex-center relative h-10 w-full input-component'>
                <input type='text'
                    value={cost}
                    name='cost'
                    onChange={changeCostHandler}
                    className='h-full w-full border-gray-300 border-[2px] px-2 transition-all border-blue
                            rounded-sm bg-slate-50 focus:border-cyan-500 outline-none'
                    required
                />
                <label htmlFor='cost'
                    className='absolute left-2 transition-all bg-slate-50 px-1 pointer-events-none'>
                    Cost
                </label>
                <span className='ml-4'>
                    <Counter initialValue={quantity}
                        onInc={incQuantity} onDec={decQuantity} />
                </span>
            </div>
        </Modal>
    )
}


export default AddItem;