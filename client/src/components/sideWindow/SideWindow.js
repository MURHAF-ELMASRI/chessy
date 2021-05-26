import { useState, useEffect, memo } from 'react';

import {
    Paper,
    useTheme,
    useMediaQuery,
    List,
    Typography,
    Grid,
    Avatar,
    Fab,
    Slide,
    Button,
} from '@material-ui/core';
import ListElement from './ListElement';
import { makeStyles } from '@material-ui/core/styles';
import useAuth from '../../hooks/useAuth';
//logos
import { Icon } from '@iconify/react';
import accountCircle from '@iconify-icons/mdi/account-circle';
import logoutVariant from '@iconify-icons/mdi/logout-variant';
import chevronUp from '@iconify-icons/mdi/chevron-up';

//firebse
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import useDialog from '../../hooks/useDialog';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        position: 'fixed',
        zIndex: 2,
        width: drawerWidth,
        overflowY: 'scroll',
        height: '90%',
    },
    listItem: {
        padding: theme.spacing(1),
        width: '100%',
    },
    bar: {
        width: '100%',
        hieght: '100%',
        background:
            'linear-gradient(to right, rgb(0, 180, 219), rgb(0, 131, 176))',
        padding: theme.spacing(4),
    },

    logoutIcon: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
    fab: {
        position: 'absolute ',
        left: drawerWidth + 10,
    },
}));

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
};

function SideWindow() {
    const [usersList, setUsersList] = useState([]);
    const classes = useStyles();
    const { user } = useAuth();
    const { setDialogState } = useDialog();
    const theme = useTheme();
    const mediaQr = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = useState(mediaQr);

    useEffect(() => {
        if (user.uid) {
            firebase
                .database()
                .ref('users')
                .on('value', (snapshot) => {
                    if (snapshot.val()) {
                        const data = Object.keys(snapshot.val()).reduce(
                            (filterd, element) => {
                                if (element !== user.uid)
                                    filterd.push({
                                        uid: element,
                                        ...snapshot.val()[element],
                                    });
                                return filterd;
                            },
                            []
                        );
                        setUsersList(data);
                    }
                });
        }
    }, [user]);

    useEffect(() => {
        if (user.uid) {
            const fireRef = firebase.database().ref('users');

            fireRef.on('child_changed', (snapshot) => {
                const newState = { uid: snapshot.key, ...snapshot.val() };


                const data = usersList.map((e) => {
                    if (e.uid === newState.uid) return newState;
                    else return e;
                });

                setUsersList(data);
            });
        }
    }, [user, usersList]);
    useEffect(() => {
        setOpen(mediaQr);
    }, [mediaQr]);
    return (
        <>
            <Fab
                onClick={() => setOpen((prev) => !prev)}
                color="primary"
                className={classes.fab}
            >
                <Icon icon={chevronUp} />
            </Fab>
            <Slide direction="right" in={open}>
                <Paper className={classes.root}>
                    <Grid container>
                        {/* display user info */}
                        {user && (
                            <Grid
                                item
                                container
                                direction="row"
                                className={classes.listItem}
                                alignItems="center"
                            >
                                {user.photoURL ? (
                                    <Avatar
                                        alt={user.displayName}
                                        src={user.photoURL}
                                    />
                                ) : (
                                    <Grid item xs={3}>
                                        <Icon width={40} icon={accountCircle} />
                                    </Grid>
                                )}
                                <Grid item xs={7}>
                                    <Typography>{user.displayName}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Icon
                                        className={classes.logoutIcon}
                                        onClick={() => {
                                            if (user.state === 'busy') {
                                                setDialogState({
                                                    open: true,
                                                    title: 'log out',
                                                    content:
                                                        'You will lose the game?',
                                                    actions: (
                                                        <>
                                                            <Button
                                                                onClick={() => {
                                                                    firebase
                                                                        .auth()
                                                                        .signOut();

                                                                    setDialogState(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            open: false,
                                                                        })
                                                                    );
                                                                }}
                                                            >
                                                                OK
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setDialogState(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            open: false,
                                                                        })
                                                                    );
                                                                }}
                                                            >
                                                                CONTINUE
                                                            </Button>
                                                        </>
                                                    ),
                                                });
                                            }
                                        }}
                                        width={30}
                                        icon={logoutVariant}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {/* end user info */}
                        {/* side bar upbar */}
                        <Grid item className={classes.bar}>
                            <Typography variant="h5">CHESSY 🤔♟</Typography>
                        </Grid>
                        {/* end side bar upbar */}
                        {/* list of users or Log in */}
                        {user ? (
                            <Grid item>
                                <List>
                                    {(() => {
                                        if (usersList)
                                            return usersList.map((e) => {
                                                return (
                                                    <ListElement
                                                        user={e}
                                                        key={e.uid}
                                                    />
                                                );
                                            });
                                    })()}
                                </List>
                            </Grid>
                        ) : (
                            <Grid
                                className={classes.logInGrid}
                                container
                                direction="row"
                                alignContent="center"
                                justifycontent="center"
                            >
                                <Grid item container xs={12} justify="center">
                                    <Typography variant="h5">
                                        You need to{' '}
                                    </Typography>
                                    <Typography variant="h4" color="secondary">
                                        {' '}
                                        register 😊
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledFirebaseAuth
                                        uiConfig={uiConfig}
                                        firebaseAuth={firebase.auth()}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {/* end of user list of login */}
                    </Grid>
                </Paper>
            </Slide>
        </>
    );
}

export default memo(SideWindow);
