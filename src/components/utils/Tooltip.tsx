import React, { FC } from 'react';
import { useSpring, animated } from 'react-spring';

import Tippy from '@tippyjs/react';
import { Instance } from 'tippy.js';

interface props {
    children: JSX.Element,
    content: string
}

const Tooltip: FC<props> = ({ children, content }) => {
    const [style, animate] = useSpring(() => ({ opacity: 0 }));

    const onMount = () => {
        animate({ opacity: 0.6 })
    }
    const onHide = ({ unmount }: Instance) => {
        animate({
            opacity: 0,
            onRest: unmount,
            config: { clamp: true }
        });
    }
    return (
        <Tippy content={
            <animated.div style={style} className='bg-cyan-50 rounded py-0.2 px-1 border-cyan-500 border-[1px] text-xs '>
                {content}
            </animated.div>}
            delay={800}
            animation={true}
            onMount={onMount}
            onHide={onHide}
        >
            <div>
                {children}
            </div>
        </Tippy>
    )
}

export default Tooltip;