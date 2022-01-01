import React, { FC, SyntheticEvent, MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface props {
    submitEvent: () => void,
    keyword: string,
    defaultNavigate?: boolean
}
const Modal: FC<props> = ({ children, submitEvent, keyword, defaultNavigate = true }) => {
    const navigate = useNavigate();
    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        submitEvent();
        if (defaultNavigate)
            navigate(`../`);
    }
    const cancel = (e: MouseEvent) => {
        if (e.target === e.currentTarget)
            navigate(`../`);
    }
    return (
        <div className='flex-center justify-center absolute top-0 left-0 h-screen w-screen bg-slate-800/60 z-10'
            onClick={cancel}
        >
            <div className='flex-center lg:flex-[0.3] md:flex-[0.3] p-8 bg-slate-50 rounded-2xl shadow-xl max-w-8xl'>
                <form onSubmit={submitHandler}
                    className='flex-center flex-col w-full'>
                    {children}
                    <span className='flex-center justify-end mt-6 w-full'>
                        <Link to='../'>
                            <button type='reset'
                                className='px-4 py-1 text-red-500 hover:underline'
                            >Cancel</button>
                        </Link>
                        <button type='submit'
                            className='px-4 py-1 rounded ml-1
                            border-[2px]hover:shadow-sm text-slate-100
                            bg-green-600 border-emerald-700'
                        >
                            {keyword}
                        </button>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Modal;