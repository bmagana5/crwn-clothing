import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// the actual value to access from context
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

//  use this provider component to wrap around components that you want to have access to context
/*  this provider will have a state hook that keeps track of our logged in user
    and it will be accessible to all components that are wrapped inside of <UserProvider>

    e.g.
    <UserProvider>
        <App/>
    </UserProvider>
*/
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe; // will run this when component unmounts to clear handler
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};