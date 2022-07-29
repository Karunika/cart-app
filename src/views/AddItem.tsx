import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, save } from '../feature/cartSlice';

import { BiError } from 'react-icons/bi';

import Modal from '../components/utils/Modal';
import Input from '../components/utils/Input';
import Counter from '../components/utils/Counter';
import Dropdown from '../components/utils/Dropdown';

const AddItem = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef && inputRef.current) inputRef.current.focus();
    }, []);
    const [optionVal, setOptionVal] = useState<string>(`piece`);
    const [name, setName] = useState<string>(``);
    const [cost, setCost] = useState<string>(``);
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<string>(``);

    const { cartId } = useParams();
    const dispatch = useDispatch();

    const submitEvent = () => {
        dispatch(
            addItem([
                cartId,
                {
                    name,
                    cost: (+cost).toFixed(2),
                    quantity: +quantity.toFixed(step(optionVal)[1]),
                    per: optionVal,
                },
            ])
        );
        dispatch(save());
        setName(``);
        setCost(`0`);
        setQuantity(1);
    };
    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 32) {
            setError(`Size of the name cannot exceed 32 character limit.`);
        } else {
            setName(e.target.value);
            setError(``);
        }
    };
    const changeCostHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^[0-9]*(\.[0-9]*)?$/.test(e.target.value)) {
            setCost(e.target.value);
            setError(``);
        } else {
            setError(`Invalid Cost Input. Only floats or integers allowed.`);
        }
    };

    const step = (entity: string) => {
        switch (entity) {
            case `piece`:
                return [1, 0];
            case `kg`:
                return [0.001, 3];
            case `liter`:
                return [0.001, 3];
            default:
                return [1, 0];
        }
    };
    useEffect(() => {
        setQuantity(step(optionVal)[0]);
    }, [optionVal]);
    return (
        <Modal submitEvent={submitEvent} keyword='add'>
            <h2>Add a new Item</h2>
            {error && (
                <span className='flex-center mb-10 border-red-400 border-[1px] rounded bg-red-200 w-full px-2 py-1'>
                    <BiError />
                    <span className='ml-2'>{error}</span>
                </span>
            )}
            <Input
                value={name}
                name='name'
                onChange={changeNameHandler}
                label='Name'
                className='mb-6'
            />
            <div className='flex-center mb-6'>
                <Input
                    value={cost}
                    name='cost'
                    onChange={changeCostHandler}
                    label='Cost'
                />
                <span className='mx-2 text-sm -rotate-90'>per</span>
                <Dropdown
                    options={[`piece`, `kg`, `liter`]}
                    label='Entity'
                    optionVal={optionVal}
                    setOptionVal={setOptionVal}
                    defaultOption='piece'
                />
            </div>
            <span className='flex-center justify-start h-10 w-full'>
                <span className='mr-4'>Quantity:</span>
                <Counter
                    counter={quantity}
                    setCounter={setQuantity}
                    step={step(optionVal)[0]}
                    precision={step(optionVal)[1]}
                />
            </span>
        </Modal>
    );
};

export default AddItem;
