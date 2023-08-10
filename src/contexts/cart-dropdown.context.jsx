import { createContext, useState } from "react";


export const CartDropdownContext = createContext({
    isCartDropdownOpen: false, 
    setIsCartDropdownOpen: () => null
});

export const CartDropdownProvider = ({ children }) => {
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
    const value = { isCartDropdownOpen, setIsCartDropdownOpen };

    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
};