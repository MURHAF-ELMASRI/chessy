import { useContext, useState, createContext } from 'react';

export const webSocketContext = createContext();

export default function useWebSocket() {
    return useContext(webSocketContext);
}

export function WebSocketProvider({ children }) {
    const [webSocket, setWebSocket] = useState();

    return (
        <webSocketContext.Provider value={{ webSocket, setWebSocket }}>
            {children}
        </webSocketContext.Provider>
    );
}
