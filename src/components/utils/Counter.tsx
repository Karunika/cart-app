import React, { ChangeEvent, FC, FocusEvent, useState, useEffect } from 'react';

interface props {
    counter: number;
    setCounter?: (c: number | ((a: number) => number)) => void;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    className?: string;
}
interface b_props {
    clickHandler: () => void;
    disabled: boolean;
    side: string;
}

const Counter: FC<props> = ({
    counter,
    setCounter = () => {},
    min = 0,
    max = 256,
    step = 1,
    precision = 0,
    className,
}) => {
    const Button: FC<b_props> = ({
        children,
        clickHandler,
        disabled,
        side,
    }) => {
        return (
            <button
                type='reset'
                className={`bg-cyan-50 ${
                    side === `right`
                        ? `border-l-cyan-500 border-l-[1px]`
                        : `border-r-cyan-500 border-r-[1px]`
                }
                h-full px-3 font-mono text-lg disabled:opacity-60 disabled:cursor-not-allowed`}
                onClick={clickHandler}
                disabled={disabled}
            >
                {children}
            </button>
        );
    };
    const [focused, setFocused] = useState<boolean>(false);
    const [val, setVal] = useState<string>(`` + counter);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^[0-9]*(\.[0-9]*)?$/.test(e.target.value)) setVal(e.target.value);
    };
    const validate = ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
        if (+value < min) setVal(`` + min);
        else if (+value > max) setVal(`` + max);
        else setVal(parseFloat(value).toFixed(precision));
    };
    const incHandler = () => {
        setVal(prev => String(+prev + step));
    };
    const decHandler = () => {
        setVal(prev => String(+prev - step));
    };
    useEffect(() => {
        if (!focused) setCounter(+val);
    }, [val]);
    useEffect(() => {
        setVal(`` + counter);
    }, [counter]);
    return (
        <span className={`relative h-10 ${className}`}>
            <span className='flex-center w-full h-full rounded border-cyan-500 border-[1px] overflow-hidden'>
                <Button
                    clickHandler={decHandler}
                    disabled={counter === min}
                    side='left'
                >
                    -
                </Button>
                <input
                    type='text'
                    value={val}
                    onChange={changeHandler}
                    onFocus={() => setFocused(true)}
                    onBlur={validate}
                    className='h-full outline-0 px-2 text-lg w-16 text-center bg-slate-0'
                />
                <Button
                    clickHandler={incHandler}
                    disabled={counter === max}
                    side='right'
                >
                    +
                </Button>
            </span>
        </span>
    );
};

export default Counter;
