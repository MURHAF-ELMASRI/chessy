import Game from "./container/Game";
import { Grid, makeStyles } from "@material-ui/core";
import SideWindow from "./container/SideWindow/SideWindow";
import DialogComponent from "./container/Dialog";
import NotificationComponent from "src/container/Notification";
import Logs from "src/component/Logs";
import registerUser from "src/core/services/registerUser";

registerUser();

export default function App() {
  const classes = useStyle();

  return (
    <>
      <DialogComponent />
      <NotificationComponent />
      <SideWindow />
      <Grid container className={classes.main}>
        <Grid item container justifyContent="center" alignItems="center" sm={3}>
          <Grid item className={classes.logs}>
            <Logs />
          </Grid>
        </Grid>

        <Grid item sm={6} container justifyContent="center" alignItems="center">
          <Game />
        </Grid>
      </Grid>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  logs: {
    height: "200px",
    overflowX: "hidden",
    overflowY: "scroll",
    padding: "2rem",
    width: "100%",
  },
  main: {
    overflow: "hidden",
    height: "100vh",
    backgroundColor: "#525252",
  },
}));
