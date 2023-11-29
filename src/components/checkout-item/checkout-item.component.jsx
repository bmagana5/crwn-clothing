import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

const CheckoutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    const { addItemToCart, subItemFromCart, removeItemFromCart } = useContext(CartDropdownContext);

    const addQuantity = () => {
        addItemToCart(cartItem);
    };

    const subtractQuantity = () => {
        subItemFromCart(cartItem);
    };

    const removeItem = () => {
        removeItemFromCart(cartItem);
    };

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={subtractQuantity}>&#10094;</span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={addQuantity}>&#10095;</span>
            </span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={removeItem}>&#10005;</span>
        </div>
    );
};

export default CheckoutItem;