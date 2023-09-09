import React, {createContext, useContext, useEffect, useState} from 'react';
import getUserInfo from "./GetUserInfo";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserInfo().then(userData => {
            if (userData) {
                setUser(userData);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}