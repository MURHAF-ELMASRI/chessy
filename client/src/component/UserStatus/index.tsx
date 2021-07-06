//component
import { Grid, makeStyles, Typography, IconButton } from "@material-ui/core";
import UserAvatar from "../UserAvatar";
//states
import LogOutButton from "@component/LogOutButton";
//types
import firebase from "firebase";

interface Props {
  user: firebase.User;
}

function UserStatus({ user }: Props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.listItem} alignItems="center">
      <Grid item>
        <UserAvatar displayName={user.displayName} photoURL={user.photoURL} />
      </Grid>
      <Grid item xs={7}>
        <Typography>{user.displayName}</Typography>
      </Grid>
      <Grid item xs={2}>
        <LogOutButton />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1),
    width: "100%",
  },
}));

export default UserStatus;
