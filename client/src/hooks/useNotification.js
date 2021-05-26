import { useState, createContext, useContext } from 'react';

export const NotificationContext = createContext();

export function NotificationProvider(props) {
    const [noti, setNoti] = useState({
        open: false,
        severity: '',
        content: '',
    });

    return (
        <NotificationContext.Provider value={{ noti, setNoti }}>
            {props.children}
        </NotificationContext.Provider>
    );
}
export default function useNotification() {
    return useContext(NotificationContext);
}
