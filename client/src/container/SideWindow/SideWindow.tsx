import { useState, useEffect, memo, useMemo } from "react";

import {
  Paper,
  useTheme,
  useMediaQuery,
  Typography,
  Grid,
  Fab,
  Slide,
} from "@material-ui/core";
import UserStatus from "@component/UserStatus";
import UsersList from "@component/UsersList";
//Icons
import { Icon } from "@iconify/react";
import chevronUp from "@iconify-icons/mdi/chevron-up";
//firebase
import firebase from "firebase";
//hooks
import { makeStyles } from "@material-ui/core/styles";
//util
import { getUsersList } from "@util/getUsrsList";
//type
import RegisterPanel from "@component/RegisterPanel";
import { User } from "@type/User";

const drawerWidth = 240;

const SideWindow: React.FC = () => {
  const classes = useStyles();

  const user = useMemo(
    () => firebase.auth().currentUser,
    [firebase.auth().currentUser]
  );

  const [allUsers, setUsersList] = useState<User[]>([]);

  const theme = useTheme();
  const mediaQr = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (user) {
      setUsersList(getUsersList(user.uid));
      //set lister to the updated values of database
      const fireRef = firebase.database().ref("users");
      fireRef.on("child_changed", (snapshot) => {
        const newState = { uid: snapshot.key, ...snapshot.val() };

        const data = allUsers.map((e) => {
          if (e.uid === newState.uid) return newState;
          else return e;
        });
        setUsersList(data);
      });
    }
  }, [user]);

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
            {user && (
              <Grid item>
                <UserStatus user={user} />
              </Grid>
            )}

            <Grid item className={classes.bar}>
              <Typography variant="h5">CHESSY 🤔♟</Typography>
            </Grid>

            {user ? (
              <Grid item>
                <UsersList allUsers={allUsers} />
              </Grid>
            ) : (
              <RegisterPanel />
            )}
          </Grid>
        </Paper>
      </Slide>
    </>
  );
};

export default memo(SideWindow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    position: "fixed",
    zIndex: 2,
    width: drawerWidth,
    overflowY: "scroll",
    height: "90%",
  },
  bar: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(to right, rgb(0, 180, 219), rgb(0, 131, 176))",
    padding: theme.spacing(4),
  },
  fab: {
    position: "absolute",
    left: drawerWidth + 10,
  },
}));
