import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { userType } from '../../Types/Types';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Icon } from '@iconify/react';
import windowClose from '@iconify-icons/mdi/window-close';

import useWebSocket from '../../hooks/useWebSocket';

import knight from '@iconify-icons/fa-solid/chess-knight';
import useNotification from '../../hooks/useNotification';
import useDialog from '../../hooks/useDialog';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    Button,
    IconButton,
    Tooltip,
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },

    avatar: {
        backgroundColor: '#FFC83D',
    },
    bottom: {},
}));
//what to display in notification*
function NotificationContent() {
    const { webSocket } = useWebSocket();
    const { setNoti } = useNotification();
    return (
        <>
            <Typography>wating</Typography>
            <CircularProgress size={20} />
            <Tooltip title="cancel">
                <Button
                    onClick={() => {
                        webSocket.send(JSON.stringify({ msg: 'cancel' }));
                        setNoti((prev) => ({
                            ...prev,
                            open: false,
                            severity: '',
                        }));
                    }}
                    style={{ width: '10px' }}
                >
                    <Icon icon={windowClose} />
                </Button>
            </Tooltip>
        </>
    );
}

//TODO: handle the stop case
function UserInfo({ user, setOpen, setKeep }) {
    const classes = useStyle();
    const { webSocket } = useWebSocket();
    const { setNoti, noti } = useNotification();
    const { setDialogState } = useDialog();
    function handlePlay() {
        setDialogState({
            open: true,
            title: (
                <>
                    Chose color
                    <IconButton
                        onClick={() => {
                            setDialogState((prev) => ({
                                ...prev,
                                open: false,
                            }));
                        }}
                    >
                        <Icon icon={windowClose} />
                    </IconButton>
                </>
            ),
            actions: (
                <>
                    <IconButton onClick={() => handleChoseColor(user, true)}>
                        <Icon icon={knight} />
                    </IconButton>
                    <IconButton onClick={() => handleChoseColor(user, false)}>
                        <Icon style={{ color: 'black' }} icon={knight} />
                    </IconButton>
                </>
            ),
        });
        setKeep(false);
    }
    function handleChoseColor(user, color) {
        console.log('running');

        webSocket.send(
            JSON.stringify({
                msg: 'request-play',
                opponentUID: user.uid,
                color,
            })
        );
        setNoti({
            open: true,
            severity: 'info',
            content: <NotificationContent />,
        });
        setKeep(false);
        setOpen(false);
        setDialogState((prev) => ({ ...prev, open: false }));
    }

    return (
        <Card
            onMouseEnter={() => setKeep(true)}
            onMouseLeave={() => setKeep(false)}
            className={classes.root}
        >
            <CardHeader
                avatar={
                    user.photoURL ? (
                        <Avatar src={user.photoURL} alt={user.displayName} />
                    ) : (
                        <Avatar className={classes.avatar}>
                            {user.displayName && user.displayName[0]}
                        </Avatar>
                    )
                }
                title={user.displayName ? user.displayName : ''}
                subheader={user.email ? user.email : ''}
            />
            <CardContent>
                <Typography>
                    win : &nbsp;&nbsp; {user.win ? user.win : ' - '}
                </Typography>
                <Typography>
                    tie : &nbsp;&nbsp; &nbsp; {user.tie ? user.tie : ' - '}
                </Typography>
                <Typography>
                    lose : &nbsp; {user.lose ? user.lose : ' - '}
                </Typography>
            </CardContent>
            <CardActions>
                {user.state === 'online' && (
                    <Button
                        disabled={noti.severity === 'info' && noti.open}
                        onClick={() => handlePlay()}
                        color="primary"
                        variant="contained"
                    >
                        play
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

UserInfo.prototype = {
    user: userType,
};

export default UserInfo;
