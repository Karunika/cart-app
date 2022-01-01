import React from 'react';
import Router from './Router';
import CartsMenu from './components/CartsMenu';

import { useSpring, animated } from 'react-spring';

const App = () => {
    const props = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {
            duration: 800
        }
    })
    return (
        <>
            <div className='p-6 h-screen'>
                <animated.div
                    style={props}
                    className='container flex flex-row items-stretch mx-auto
                    h-full rounded-md p-6'>
                        
                    <CartsMenu />
                    <Router />
                </animated.div>
            </div>
        </>
    )
}

export default App;