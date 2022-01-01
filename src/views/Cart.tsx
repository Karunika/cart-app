import React, { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import CartWrapper from '../components/CartWrapper';

const Cart: FC = () => {
    const { cartId } = useParams();
    return cartId ? (
        <CartWrapper cartId={cartId} />
    ) : <Navigate to='/' />
}

export default Cart;