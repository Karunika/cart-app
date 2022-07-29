import React, { ChangeEvent, FocusEvent, forwardRef } from 'react';

interface props {
    value: string;
    name: string;
    label: string;
    className?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, props>(
    (
        {
            value,
            name,
            label,
            className = ``,
            onChange,
            onFocus = () => {},
            onBlur = () => {},
        },
        ref
    ) => {
        return (
            <div
                className={`flex-center relative h-10 w-full input-component ${className}`}
            >
                <input
                    type='text'
                    ref={ref}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className='h-full w-full border-gray-300 border-[2px] px-2 transition-all border-blue
                        rounded-sm bg-slate-50 focus:border-cyan-500 outline-none'
                    required
                />
                <label
                    htmlFor={name}
                    className='absolute left-2 transition-all bg-slate-50 px-1 pointer-events-none'
                >
                    {label}
                </label>
            </div>
        );
    }
);

Input.displayName = `Input`;

export default Input;
