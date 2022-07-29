import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useUnloadCautionPrompt } from '../app/hooks';
import { moveCart } from '../feature/cartSlice';

import { BiChevronRight, BiCart } from 'react-icons/bi';

import Header from './layouts/Header';
import DndEditTools from './utils/DndEditTools';
import Button from './utils/Button';
import CartItem from './CartItem';
import DroppablerDiv from './utils/DroppablerDiv';

import Tooltip from './utils/Tooltip';

const CartsMenu = () => {
    const [fs, setFs] = useState(false);

    const { pathname } = useLocation();
    useEffect(() => {
        if ([`/`, `/create`].includes(pathname)) {
            setFs(true);
        } else {
            setFs(false);
        }
    }, [pathname]);

    const [editingMode, setEditingMode] = useState(false);

    const { carts, cartsSeq } = useAppSelector(store => store.cart);
    const HeadingRow = () => {
        const cl = `text-slate-500 text-center w-60`;
        return (
            <span className='flex-center cursor-default text-sm justify-between mr-24 mb-1'>
                <span className='text-slate-500 block ml-8'>Cart</span>
                <span className='flex-center'>
                    <span className={`${cl} block`}>Date Created</span>
                    <span className={`${cl} lg:block hidden`}>
                        Last Modified
                    </span>
                    <span className={`${cl} block w-24`}>Size</span>
                </span>
            </span>
        );
    };
    useUnloadCautionPrompt(editingMode);
    return (
        <div className='flex flex-col items-stretch h-full grow'>
            <Header>
                <>
                    <Link
                        to='/'
                        className={`flex-center w-full ${
                            !fs ? `border-b-[2px] pb-4` : ``
                        }`}
                    >
                        <h1 className='text-4xl flex-1'>My Carts</h1>
                        {!fs && (
                            <Tooltip content='expand'>
                                <BiChevronRight className='text-4xl inline-block' />
                            </Tooltip>
                        )}
                    </Link>
                    {fs && (
                        <span className='icons-r'>
                            <DndEditTools
                                editingMode={editingMode}
                                setEditingMode={setEditingMode}
                            />
                            <Button to='/create' Icon={BiCart} text='Create' />
                        </span>
                    )}
                </>
            </Header>

            <DroppablerDiv
                dispatchFunc={moveCart}
                isDropDisabled={!editingMode}
            >
                {!cartsSeq.length ? (
                    `You have no carts.`
                ) : (
                    <>
                        {fs && <HeadingRow />}

                        {cartsSeq.map((_id: string, i: number) => (
                            <CartItem
                                key={_id}
                                cart={carts[_id]}
                                index={i}
                                dndDisabled={!editingMode}
                                fs={fs}
                            />
                        ))}
                    </>
                )}
            </DroppablerDiv>
        </div>
    );
};

export default CartsMenu;
