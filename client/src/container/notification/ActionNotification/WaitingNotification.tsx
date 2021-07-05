import {
  Typography,
  CircularProgress,
  Button,
  Tooltip,
  makeStyles,
  Snackbar,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import { InlineIcon } from "@iconify/react";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { hideNotification } from "@store/reducer/notification";

import windowClose from "@iconify-icons/mdi/window-close";
import encodeMessage from "@util/encodeMessage";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifiyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

const WaitingNotification = ({ open }: { open: boolean }) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const webSocket = useAppSelector((state) => state.webSocket.webSocket);
  const handleClick = () => {
    webSocket?.send(encodeMessage({ msg: "cancel" }));
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert elevation={6} variant="filled" severity={"info"}>
        <div className={classes.container}>
          <Typography>waiting</Typography>
          <CircularProgress size={20} />
          <Tooltip title="cancel">
            <Button onClick={handleClick} style={{ width: "10px" }}>
              <InlineIcon icon={windowClose} />
            </Button>
          </Tooltip>
        </div>
      </Alert>
    </Snackbar>
  );
};

export default WaitingNotification;
