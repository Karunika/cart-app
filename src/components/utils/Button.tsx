import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import type { IconType } from 'react-icons';

interface props {
    to: string;
    Icon: IconType;
    text: string;
}

const Button: FC<props> = ({ to, Icon, text }) => {
    return (
        <Link to={to}>
            <button
                className='px-4 py-1 rounded ml-4 border-[1px] hover:shadow-lg
                    bg-cyan-50 border-cyan-500 cart-btn'
            >
                <span className='cart'>
                    <Icon />
                </span>
                <span className='ml-3 mr-2'>{text}</span>
            </button>
        </Link>
    );
};

export default Button;
