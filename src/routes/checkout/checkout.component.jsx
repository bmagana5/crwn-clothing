import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

const Checkout = () => {
    const { cartItems } = useContext(CartDropdownContext);

    const cartTotal = cartItems.reduce((previousValue, currentValue, currentIndex) => {
        return (currentValue.price * currentValue.quantity) + previousValue; 
    }, 0);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <span className="header-block">Product</span>
                <span className="header-block">Description</span>
                <span className="header-block">Quantity</span>
                <span className="header-block">Price</span>
                <span className="header-block">Remove</span>
            </div>
            {cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
            <span className="total">Total: ${cartTotal}</span>
        </div>
    );
};

export default Checkout;