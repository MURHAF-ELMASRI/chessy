import { useEffect, memo } from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import useDialog from '../hooks/useDialog';

function DialogComponent() {
    const { dialogState } = useDialog();

    return (
        <Dialog
            open={dialogState.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {dialogState.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogState.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>{dialogState.actions}</DialogActions>
        </Dialog>
    );
}
export default memo(DialogComponent);
