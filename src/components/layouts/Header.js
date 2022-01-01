import React from 'react';

const Header = ({ children }) => {
    return (
        <header className='flex-center mb-6 justify-between'>
            {children}
        </header>
    )
}

export default Header;