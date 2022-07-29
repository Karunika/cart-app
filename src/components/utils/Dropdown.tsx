import React, { FC, ChangeEvent, useState, useRef } from 'react';

import Input from './Input';

interface props {
    options: string[];
    label: string;
    optionVal: string;
    setOptionVal: React.Dispatch<React.SetStateAction<string>>;
    defaultOption?: string;
}

const Dropdown: FC<props> = ({
    options,
    label,
    optionVal,
    setOptionVal,
    defaultOption = ``,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropdownOptions, setDropdownOptions] = useState<string[]>(options);
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDropdownOptions(
            options.filter((option: string) =>
                option.startsWith(e.target.value)
            )
        );
        setOptionVal(e.target.value);
    };
    const optionClickHandler = (option: string) => {
        setOptionVal(option);
    };
    const blurHandler = () => {
        setCollapsed(true);
        if (dropdownOptions.length === 0) setOptionVal(defaultOption);
        else if (dropdownOptions.length === 1) setOptionVal(dropdownOptions[0]);
    };
    return (
        <div className='relative focus:outline-4'>
            <Input
                value={optionVal}
                name='option'
                label={label}
                onChange={changeHandler}
                onFocus={() => setCollapsed(false)}
                onBlur={blurHandler}
                ref={inputRef}
            />
            {!collapsed && (
                <div className='flex flex-col absolute bg-cyan-50 z-10 w-full border-[1px] border-cyan-500 -mt-1'>
                    {dropdownOptions.map((option: string, index: number) => (
                        <button
                            key={index}
                            onMouseDown={() => optionClickHandler(option)}
                            className='hover:bg-slate-100 h-10 px-2 truncate border-t-[1px] border-cyan-500'
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
