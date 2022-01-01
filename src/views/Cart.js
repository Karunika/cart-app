import React from 'react';
import { useParams } from 'react-router-dom';

import CartWrapper from '../components/CartWrapper';

const Cart = () => {
    const { cartId } = useParams();
    return (
        <CartWrapper cartId={cartId} />
    )
}

export default Cart;