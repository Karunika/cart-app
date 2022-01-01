import React, { FC } from 'react';

const Header: FC = ({ children }) => {
    return (
        <header className='flex-center mb-6 justify-between'>
            {children}
        </header>
    )
}

export default Header;