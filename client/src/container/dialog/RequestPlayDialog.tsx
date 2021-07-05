import { memo, useCallback } from "react";
//Component
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";

//util

//state
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";

//action
import { hideDialog } from "@store/reducer/dialog";
import { hideNotification } from "@store/reducer/notification";
import { Color } from "@material-ui/lab/Alert";
import { acceptGame, rejectGame } from "@store/reducer/gameState";
import { color } from "@constants/color";

const DialogOption = ({ color }: { color: boolean }) => {
  const dispatch = useAppDispatch();

  const handleAccept = useCallback((color) => {
    dispatch(acceptGame());
    dispatch(hideDialog());

    setTimeout(() => dispatch(hideNotification()), 3000);
  }, []);

  const handleReject = useCallback(() => {
    dispatch(rejectGame());
    dispatch(hideDialog());
  }, []);

  return (
    <>
      <Button onClick={() => handleAccept(color)}>yes</Button>
      <Button onClick={() => handleReject()}>no</Button>
    </>
  );
};

interface Props {
  open: boolean;
  player?: {
    name: string;
    uid: string;
  };
  color?: Color;
}

const RequestPlayDialog = ({ open }: Props) => {
  const [opponentName, stoneColor] = useAppSelector((state) => [
    state.dialog.opponentName,
    state.dialog.color,
  ]);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Player {opponentName} is requesting for play with{" "}
        {stoneColor === color.white ? "white" : "black"}
      </DialogTitle>

      <DialogActions>{DialogOption}</DialogActions>
    </Dialog>
  );
};

export default memo(RequestPlayDialog);
