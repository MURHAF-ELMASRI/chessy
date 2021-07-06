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
import { useAppDispatch } from "@hooks/useAppDispatch";
import { hideDialog } from "@store/reducer/dialog";
//util
import { requestPlay } from "@store/reducer/gameState";
import { Color } from "@type/Color";
import { showActionNotification } from "@store/reducer/notification";

interface Props {
  opponentUID: string;
  color: Color;
}

const StoneOption = ({ opponentUID, color }: Props) => {
  const dispatch = useAppDispatch();
  const handleChoseColor = useCallback((color) => {
    dispatch(
      requestPlay({
        opponentUID,
        color,
      })
    );
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

const ChooseStoneColorDialog = ({ open }: Props & { open: boolean }) => {
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
function showWaitingNotification(): any {
  throw new Error("Function not implemented.");
}
