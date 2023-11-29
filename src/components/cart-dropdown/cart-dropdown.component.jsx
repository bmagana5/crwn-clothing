import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";


const CartDropdown = () => {
    const { cartItems } = useContext(CartDropdownContext);
    const navigate = useNavigate(); // this React Router Dom hook lets us specify which path to go to

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>)
                }
            </div>
            <Button buttonType="inverted" onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;