import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 } from 'uuid';

import { I_Cart, I_Item } from '../global';

const initialState: {
    cartsSeq: string[];
    carts: { [key: string]: I_Cart };
} = {
    cartsSeq: JSON.parse(window.localStorage.getItem(`cartsSeq`) ?? `[]`),
    carts: JSON.parse(window.localStorage.getItem(`carts`) ?? `{}`),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: {
            reducer: (state, { payload }: PayloadAction<I_Cart>) => {
                state.cartsSeq.push(payload._id);
                state.carts[payload._id] = payload;
            },
            prepare: (name: string) => {
                return {
                    payload: {
                        name,
                        _id: v4(),
                        dateCreated: moment.now(),
                        lastModified: moment.now(),
                        budget: 0,
                        itemsSeq: [],
                        items: {},
                    },
                };
            },
        },
        editCart: (state, { payload: [cartId, newName] }) => {
            state.carts[cartId].name = newName;
        },
        removeCart: (state, { payload }) => {
            state.cartsSeq = state.cartsSeq.filter(
                (_id: string) => _id !== payload
            );
            delete state.carts[payload];
        },
        moveCart: (state, { payload }) => {
            let [dragId, dropId] = payload;
            state.cartsSeq.splice(
                dropId,
                0,
                state.cartsSeq.splice(dragId, 1)[0]
            );
        },
        addItem: {
            reducer: (
                state,
                { payload }: PayloadAction<{ _id: string; item: I_Item }>
            ) => {
                // @ts-ignore
                state.carts[payload._id].itemsSeq.push(payload.item._id);
                state.carts[payload._id].items[payload.item._id] = payload.item;

                state.carts[payload._id].budget += +(
                    payload.item.quantity * payload.item.cost
                ).toFixed(2);
            },
            prepare: payload => {
                return {
                    payload: {
                        _id: payload[0],
                        item: {
                            ...payload[1],
                            _id: v4(),
                            dateAdded: moment.now(),
                        },
                    },
                };
            },
        },
        editItem: (state, { payload: [cartId, itemId, newName, newCost] }) => {
            state.carts[cartId].items[itemId].name = newName;
            state.carts[cartId].budget += +(
                state.carts[cartId].items[itemId].quantity *
                (newCost - state.carts[cartId].items[itemId].cost)
            ).toFixed(2);
            state.carts[cartId].items[itemId].cost = newCost;
        },
        incItem: (state, { payload: [cartId, itemId] }) => {
            state.carts[cartId].items[itemId].quantity++;
            state.carts[cartId].budget +=
                +state.carts[cartId].items[itemId].cost;
        },
        decItem: (state, { payload: [cartId, itemId] }) => {
            state.carts[cartId].items[itemId].quantity--;
            state.carts[cartId].budget -=
                +state.carts[cartId].items[itemId].cost;
        },
        removeItem: (state, { payload }) => {
            let [cartId, itemId] = payload;
            state.carts[cartId].itemsSeq = state.carts[cartId].itemsSeq.filter(
                item => item !== itemId
            );
            state.carts[cartId].budget -= +(
                state.carts[cartId].items[itemId].cost *
                state.carts[cartId].items[itemId].quantity
            ).toFixed(2);
            delete state.carts[cartId].items[itemId];
        },
        moveItem: (state, { payload: [cartId, [dragId, dropId]] }) => {
            state.carts[cartId].itemsSeq.splice(
                dropId,
                0,
                state.carts[cartId].itemsSeq.splice(dragId, 1)[0]
            );
        },
        refresh: state => {
            state.cartsSeq = JSON.parse(
                window.localStorage.getItem(`cartsSeq`) ?? `[]`
            );
            state.carts = JSON.parse(
                window.localStorage.getItem(`carts`) ?? `{}`
            );
        },
        save: state => {
            localStorage.setItem(`carts`, JSON.stringify(state.carts));
            localStorage.setItem(`cartsSeq`, JSON.stringify(state.cartsSeq));
        },
    },
});

export const {
    addCart,
    editCart,
    removeCart,
    moveCart,
    addItem,
    removeItem,
    editItem,
    incItem,
    decItem,
    moveItem,
    refresh,
    save,
} = cartSlice.actions;
export default cartSlice.reducer;
