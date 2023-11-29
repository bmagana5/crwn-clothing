import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    let targetItem = cartItems.find((item) => item.id === productToAdd.id);
    if (targetItem) {
        return cartItems.map((item) => 
            item.id === targetItem.id ?
                { ...item, quantity: item.quantity + 1}
                : item
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subCartItem = (cartItems, productToSubtract) => {
    let targetItem = cartItems.find((cartItem) => cartItem.id === productToSubtract.id);
    if (targetItem) {
        if (targetItem.quantity > 1) {
            return cartItems.map((item) => 
                item.id === targetItem.id ?
                    { ...item, quantity: item.quantity - 1 }
                    : item
            );
        } else {
            return cartItems.filter((item) => item.id !== targetItem.id);
        }
    }
    return cartItems;
};

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const CartDropdownContext = createContext({
    isCartDropdownOpen: false, 
    setIsCartDropdownOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartItemsTotal: 0,
    subItemFromCart: () => null,
    removeItemFromCart: () => null
    // isCheckoutPageOpened: false,
    // setIsCheckoutPageOpened: () => null
});

export const CartDropdownProvider = ({ children }) => {
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsTotal, setCartItemsTotal] = useState(0);
    // const [isCheckoutPageOpened, setIsCheckoutPageOpened] = useState(false);
    
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const subItemFromCart = (productToSubtract) => {
        setCartItems(subCartItem(cartItems, productToSubtract));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };
    
    useEffect(() => {
        const newTotal = cartItems.reduce((accumulator, currentCartItem) => accumulator + currentCartItem.quantity, 0);
        setCartItemsTotal(newTotal);
    }, [cartItems]);
    
    const value = { isCartDropdownOpen, 
        setIsCartDropdownOpen, 
        cartItems, 
        addItemToCart, 
        cartItemsTotal, 
        subItemFromCart,
        removeItemFromCart
        // isCheckoutPageOpened, 
        // setIsCheckoutPageOpened 
    };
    
    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
};