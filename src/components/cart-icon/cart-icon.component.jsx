import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

const CartIcon = ({ ...otherProperties }) => {
    const { isCartDropdownOpen, setIsCartDropdownOpen, cartItemsTotal } = useContext(CartDropdownContext);


    const toggleShowCartDropdown = () => {
        setIsCartDropdownOpen(!isCartDropdownOpen);
    };

    return (
        <div className="cart-icon-container" onClick={toggleShowCartDropdown}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{cartItemsTotal}</span>
        </div>
    );
};

export default CartIcon;