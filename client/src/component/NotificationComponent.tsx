import { memo } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useNotification from '../core/store/reducer/notification';


const useStyle = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifiyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
}));

function NotificationComponent() {
    const classes = useStyle();
    const { noti } = useNotification();
    return (
        <Snackbar
            open={noti.open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Alert elevation={6} variant="filled" severity={noti.severity}>
                <div className={classes.container}>{noti.content}</div>
            </Alert>
        </Snackbar>
    );
}
export default memo(NotificationComponent);
