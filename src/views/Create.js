import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart, save } from '../store/feature/cartSlice';

import { BiError } from 'react-icons/bi';

import Modal from '../components/utils/Modal';

const Create = () => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const [error, setError] = useState(``);
    const [unfilteredName, setUnfilteredName] = useState(``);
    const [filteredName, setFilteredName] = useState(``);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitEvent = () => {
        const action = addCart(filteredName);
        console.log(action)
        dispatch(action);
        dispatch(save());
        setUnfilteredName(``);
        navigate(`/cart/${action.payload._id}`);
    }
    useEffect(() => {
        if(unfilteredName.length > 32)
            setError(`Size of the name cannot exceed 32 character limit.`);
        else{
            setFilteredName(unfilteredName);
            setError(``);
        }
    }, [unfilteredName])
    return (
        <Modal submitEvent={submitEvent} keyword='create' defaultNavigate={false}>
            <h2>Create a new Cart</h2>
            {error &&
                <span className='flex-center mb-10 border-red-400 border-[1px] rounded bg-red-200 w-full px-2 py-1'>
                    <BiError/>
                    <span className='ml-2'>{error}</span>
                </span>
            }
            <div className='flex-center relative h-10 w-full input-component'>
                <input name='name'
                    ref={inputRef}
                    value={filteredName}
                    onChange={e => setUnfilteredName(e.target.value)}
                    className='h-full w-full border-gray-300 border-[2px] px-2 transition-all border-blue
                            rounded-sm bg-slate-50 focus:border-cyan-500 outline-none'
                    required
                />
                <label htmlFor='name'
                    className='absolute left-2 transition-all bg-slate-50 px-1 pointer-events-none'>
                    Name
                </label>
            </div>
        </Modal>
    )
}

export default Create;