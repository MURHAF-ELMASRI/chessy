import react, { useState, useContext } from 'react';

export const authContext = react.createContext();

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    );
}
