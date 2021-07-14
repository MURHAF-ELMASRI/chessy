import { memo, useCallback } from "react";
//Component
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";

//util

//state
import { useAppDispatch } from "src/hooks/useAppDispatch";

//action
import { hideDialog } from "src/core/store/reducer/dialog";
import { hideNotification } from "src/core/store/reducer/notification";
import { acceptGame, rejectGame } from "src/core/store/reducer/gameState";
import { color } from "src/constants/color";
import { Color } from "src/types/Color";

interface Props {
  open: boolean;
  opponent: {
    name: string;
    uid: string;
    color: Color;
  };
}

const RequestPlayDialog = ({ open, opponent }: Props) => {
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
  console.log(opponent);
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Player {opponent.name} is requesting for play with{" "}
        {opponent.color === color.white ? "white" : "black"}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleAccept}>yes</Button>
        <Button onClick={handleReject}>no</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestPlayDialog;
