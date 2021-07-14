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
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { hideNotification } from "src/core/store/reducer/notification";

import windowClose from "@iconify-icons/mdi/window-close";
import { sendCancelGame } from "src/core/store/reducer/gameState";

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
  const handleClick = () => {
    dispatch(sendCancelGame());
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
