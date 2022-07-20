import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendCartData } from '../../store/cart-action-creators';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cart = useSelector(state => state.cart)
  const cartItems = cart.items;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title, 
              quantity: item.quantity, 
              total: item.totalPrice, 
              price: item.price }}
          />
        ))}
      </ul>
    </Card>
  );


};

export default Cart;
