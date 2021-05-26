import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Button,
    Grid,
    Avatar,
    Badge,
    Tooltip,
} from '@material-ui/core';
import UserInfo from './UserInfo';
import { Icon } from '@iconify/react';
import accountCircle from '@iconify-icons/mdi/account-circle';

const useStyles = makeStyles((theme) => ({
    badgeGreen: {
        backgroundColor: '#4caf50',
    },
    badgeYellow: { backgroundColor: '#ff9800' },

    badgeRed: {
        backgroundColor: '#f44336',
    },
    listItem: {
        padding: theme.spacing(1),
        width: '100%',
    },
    logInGrid: {
        height: '100%',
        width: '100%',
    },
    listItemContainer: {
        width: '100%',
        borderBottom: '2px solid',
        borderBottomColor: theme.palette.divider,
        borderRadius: 0,
    },
    item: {
        width: '100%',
    },
    container: {
        width: '100%',
    },
}));

//TODO : prevent render the component after hover over it

function ListElement({ user }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [keep, setKeep] = useState(false);
    return (
        <Tooltip
            title={
                <div>
                    <UserInfo setOpen={setOpen} setKeep={setKeep} user={user} />
                </div>
            }
            placement="right"
            interactive
            arrow
            open={open || keep}
        >
            <Button
                className={classes.listItemContainer}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onClick={()=>setOpen(prev=>!prev)}
            >
                <ListItem className={classes.listItem}>
                    <Grid item>
                        <ListItemAvatar>
                            <ListItemIcon>
                                <Badge
                                    classes={{
                                        badge:
                                            user.state === 'online'
                                                ? classes.badgeGreen
                                                : user.state === 'busy'
                                                ? classes.badgeYellow
                                                : classes.badgeRed,
                                    }}
                                    variant="dot"
                                >
                                    {user.photoURL ? (
                                        <Avatar
                                            src={user.photoURL}
                                            alt={user.displayName}
                                        />
                                    ) : (
                                        <Icon width={40} icon={accountCircle} />
                                    )}
                                </Badge>
                            </ListItemIcon>
                        </ListItemAvatar>
                    </Grid>
                    <Grid item>
                        <ListItemText>{user.displayName}</ListItemText>
                    </Grid>
                </ListItem>
            </Button>
        </Tooltip>
        // <h1>hello owlr</h1>
    );
}

export default ListElement;
