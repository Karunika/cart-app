import React, { FC, useState } from 'react';
import { moveItem } from '../feature/cartSlice';
import { useAppSelector, useUnloadCautionPrompt } from '../app/hooks';

import { BiPlus } from 'react-icons/bi';

import DndEditTools from './utils/DndEditTools';
import Button from './utils/Button';
import Item from './Item';
import Header from './layouts/Header';
import DroppablerDiv from './utils/DroppablerDiv';
import Tooltip from './utils/Tooltip';

interface props {
    cartId: string;
}

const CartWrapper: FC<props> = ({ cartId }) => {
    const [editingMode, setEditingMode] = useState(false);

    const cart = useAppSelector(store => store.cart.carts[cartId]);
    const { itemsSeq, items } = cart;

    const dispatchFunc =
        () =>
        ([a, b]: [string, string]) =>
            moveItem([cartId, [a, b]]);

    const HeadingRow = () => {
        const cl = `text-slate-500 text-center block w-24`;
        return (
            <span className='flex-center cursor-default text-sm justify-between mr-24 mb-1'>
                <span className='text-slate-500 block ml-8'>
                    Articles / Date Added
                </span>
                <span className='flex-center'>
                    <span className={`${cl}`}>Cost</span>
                    <span className={`${cl} mx-6`}>Quantity</span>
                    <span className={`${cl}`}>Total</span>
                </span>
            </span>
        );
    };
    useUnloadCautionPrompt(editingMode);
    return (
        <div className='flex flex-col items-stretch h-full w-2/3 ml-12'>
            <Header>
                <>
                    <Tooltip content={cart.name}>
                        <h1 className='text-4xl flex-1 text-left truncate cursor-default'>
                            {cart.name}
                        </h1>
                    </Tooltip>
                    <span className='icons-r'>
                        <DndEditTools
                            editingMode={editingMode}
                            setEditingMode={setEditingMode}
                        />
                        <Button to='add' Icon={BiPlus} text='New Item' />
                    </span>
                </>
            </Header>

            <DroppablerDiv
                dispatchFunc={dispatchFunc()}
                droppableId={cartId}
                isDropDisabled={!editingMode}
            >
                {!itemsSeq.length ? (
                    `This cart is empty.`
                ) : (
                    <>
                        <HeadingRow />

                        {itemsSeq.map((_id: string, i: number) => (
                            <Item
                                item={items[_id]}
                                index={i}
                                key={_id}
                                dndDisabled={!editingMode}
                            />
                        ))}
                    </>
                )}
            </DroppablerDiv>

            <footer className='flex-center justify-between pt-4'>
                <span className='flex flex-row items-end h-full'>
                    {itemsSeq.length} {itemsSeq.length <= 1 ? `item` : `items`}
                </span>
                <span className='mr-4'>
                    <span className='text-2xl'>Grand Total: </span>
                    <span className='text-4xl'>{cart.budget.toFixed(2)}</span>
                </span>
            </footer>
        </div>
    );
};

export default CartWrapper;
