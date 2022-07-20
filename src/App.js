import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-action-creators";

// isInitial=true makes sure that the http request will not be made when the app runs
// for the first time. It will not reset to 'true' when the App rerenders either,
// as it's outside the Component. It will only run once when the file is run once.
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // dispatch will not run the first time, but every times later when cart changes.
    if (isInitial) {
      isInitial = false;
      dispatch(fetchCartData());
      return;
    }

    // redux accepts 'thunks' for its dispatch function as an argument which itself will
    // fire the dispatch action inside the thunk function. 'dispatch' will be handed over
    // to the thunk function where it can be used.
    dispatch(sendCartData(cart))
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
