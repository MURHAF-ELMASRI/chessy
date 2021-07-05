import { memo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
} from "@material-ui/core";

//icons
import { Icon } from "@iconify/react";
import { stoneIcons } from "@icons/stoneIcons";
import windowClose from "@iconify-icons/mdi/window-close";

//states
import { useAppSelector } from "src/hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { showWaitingNotification } from "@store/reducer/notification";
import { hideDialog } from "@store/reducer/dialog";
//util
import encodeMessage from "@util/encodeMessage";

interface Props {
  open: boolean;
}

const StoneOption = () => {
  const dispatch = useAppDispatch();
  const [webSocket] = useAppSelector((state) => [state.webSocket.webSocket]);

  const handleChoseColor = useCallback((color) => {
    webSocket?.send(
      encodeMessage({
        msg: "request-play",
        //TODO: get opponent uid from state and put it here
        // opponentUID: user.uid,
        color,
      })
    );
    dispatch(showWaitingNotification("waiting for player"));
    dispatch(hideDialog());
  }, []);

  return (
    <>
      <IconButton onClick={() => handleChoseColor(true)}>
        <Icon icon={stoneIcons.knight} />
      </IconButton>
      <IconButton onClick={() => handleChoseColor(false)}>
        <Icon style={{ color: "black" }} icon={stoneIcons.knight} />
      </IconButton>
    </>
  );
};

const ChooseStoneColorDialog = ({ open }: Props) => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => dispatch(hideDialog()), []);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">choose color to play</DialogTitle>
      <DialogContent>{StoneOption}</DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <Icon icon={windowClose} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ChooseStoneColorDialog);
