import { useState, createContext, useContext } from 'react';

export const DialogContext = createContext();

export function DialogProvider(props) {
    const [dialogState, setDialogState] = useState({
        open: false,
        title: '',
        content: '',
        actions: '',
    });

    return (
        <DialogContext.Provider value={{ dialogState, setDialogState }}>
            {props.children}
        </DialogContext.Provider>
    );
}
export const useDialog = () => {
    return useContext(DialogContext);
};

export default useDialog;
