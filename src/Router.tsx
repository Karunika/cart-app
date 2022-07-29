import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Create from './views/Create';
import Cart from './views/Cart';
import AddItem from './views/AddItem';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Outlet />}>
                <Route path='create' element={<Create />} />
                <Route path='cart' element={<Outlet />}>
                    <Route index element={<Navigate to='/' />} />
                    <Route path=':cartId' element={<Cart />}>
                        <Route path='add' element={<AddItem />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;
