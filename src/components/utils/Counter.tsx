import React, { FC, useState } from 'react';

interface props {
    initialValue: number;
    onInc: () => void;
    onDec: () => void;
    min?: number;
    max?: number;
    className?: string;
}

const Counter: FC<props> = ({
    initialValue,
    onInc,
    onDec,
    min = 0,
    max = 256,
    className,
}) => {
    const [counter, setCounter] = useState(+initialValue);
    const incHandler = () => {
        setCounter(prev => prev + 1);
        onInc();
    };
    const decHandler = () => {
        setCounter(prev => prev - 1);
        onDec();
    };
    return (
        <span className={`relative ${className}`}>
            <span className='flex-center h-full w-full rounded border-cyan-500 border-[1px] overflow-hidden'>
                <button
                    type='reset'
                    className='bg-cyan-50 border-r-[1px] border-r-cyan-500 h-full px-3 font-mono text-lg disabled:opacity-60 disabled:cursor-not-allowed'
                    onClick={decHandler}
                    disabled={counter === min}
                >
                    -
                </button>
                <input
                    type='text'
                    value={counter}
                    className='h-full outline-0 px-2 text-lg w-10 text-center bg-slate-0'
                    readOnly={true}
                />
                <button
                    type='reset'
                    className='bg-cyan-50 border-l-[1px] border-l-cyan-500 h-full px-3 font-mono text-lg'
                    onClick={incHandler}
                    disabled={counter === max}
                >
                    +
                </button>
            </span>
        </span>
    );
};

export default Counter;
