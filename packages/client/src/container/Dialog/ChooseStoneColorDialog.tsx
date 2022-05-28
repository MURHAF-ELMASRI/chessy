import { memo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
} from "@material-ui/core";

//icons
import { Icon } from "@iconify/react";
import { stoneIcons } from "src/assets/icons/stoneIcons";
import windowClose from "@iconify-icons/mdi/window-close";

//states
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { hideDialog } from "src/core/store/reducer/dialog";
//util
import { requestPlay } from "src/core/store/reducer/gameState";
import { Color } from "src/types/Color";
import { color } from "src/constants/color";
import { showActionNotification } from "src/core/store/reducer/notification";

interface Props {
  opponentUID: string;
  open: boolean;
}

const StoneOption = ({ opponentUID }: { opponentUID: string }) => {
  const dispatch = useAppDispatch();
  const handleChoseColor = useCallback((playerColor: Color) => {
    dispatch(
      requestPlay({
        opponentUID,
        playerColor,
      })
    );
    dispatch(showActionNotification("wait"));
    dispatch(hideDialog());
  }, []);

  return (
    <>
      <IconButton onClick={() => handleChoseColor(color.white)}>
        <Icon icon={stoneIcons.knight} />
      </IconButton>
      <IconButton onClick={() => handleChoseColor(color.black)}>
        <Icon style={{ color: "black" }} icon={stoneIcons.knight} />
      </IconButton>
    </>
  );
};

const ChooseStoneColorDialog = ({ open, opponentUID }: Props) => {
  const dispatch = useAppDispatch();
  const handleClose = useCallback(() => dispatch(hideDialog()), []);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">choose color to play</DialogTitle>
      <DialogContent>{<StoneOption opponentUID={opponentUID} />}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ChooseStoneColorDialog);
