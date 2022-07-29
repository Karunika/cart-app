import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useUnloadCautionPrompt } from '../app/hooks';
import { moveCart } from '../feature/cartSlice';

import { BiChevronRight, BiCart } from 'react-icons/bi';

import Header from './layouts/Header';
import DndEditTools from './utils/DndEditTools';
import Button from './utils/Button';
import CartItem from './CartItem';
// import DroppablerDiv from './utils/DroppablerDiv';
import DndTable from './utils/DndTable';

import Tooltip from './utils/Tooltip';
// import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { CartMenuColumnsFs } from '../enums/CartMenuColumns';

const CartsMenu = () => {
    const [fs, setFs] = useState(false);

    const { pathname } = useLocation();
    useEffect(() => {
        setFs([`/`, `/create`].includes(pathname));
    }, [pathname]);

    const [editingMode, setEditingMode] = useState(false);

    const { carts, cartsSeq } = useAppSelector(store => store.cart);

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

            {!cartsSeq.length ? (
                `You have no Carts`
            ) : (
                <DndTable>
                    <DndTable.Header
                        columns={CartMenuColumnsFs as [string, number][]}
                    />
                    <DndTable.Body
                        dispatchFn={moveCart}
                        isDropDisabled={!editingMode}
                    >
                        {cartsSeq.map((_id: string, i: number) => (
                            <DndTable.Row
                                key={_id}
                                draggableId={_id}
                                dndDisabled={!editingMode}
                                index={i}
                            >
                                <CartItem
                                    cart={carts[_id]}
                                    dndDisabled={!editingMode}
                                />
                                {/* <DndTable.Data>ok</DndTable.Data>
                                <DndTable.Data>{carts[_id].name}</DndTable.Data>
                                <DndTable.Data>ok</DndTable.Data>
                                <DndTable.Data>ok</DndTable.Data>
                                <DndTable.Data>ok</DndTable.Data> */}
                            </DndTable.Row>
                        ))}
                    </DndTable.Body>
                </DndTable>
            )}
        </div>
    );
};

export default CartsMenu;
