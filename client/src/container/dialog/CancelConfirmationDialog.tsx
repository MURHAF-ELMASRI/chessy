import { memo, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";

//states
import { useAppDispatch } from "@hooks/useAppDispatch";
import { hideDialog } from "@store/reducer/dialog";

import firebase from "firebase";

interface Props {
  open: boolean;
}

const DialogOption = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onClick={() => {
          firebase.auth().signOut();
          dispatch(hideDialog());
        }}
      >
        {" "}
        OK
      </Button>
      <Button
        onClick={() => {
          dispatch(hideDialog());
        }}
      >
        CONTINUE
      </Button>
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
      <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
      <DialogContentText>you will lose the game 😨</DialogContentText>

      <DialogActions>{DialogOption}</DialogActions>
    </Dialog>
  );
};

export default memo(ChooseStoneColorDialog);
