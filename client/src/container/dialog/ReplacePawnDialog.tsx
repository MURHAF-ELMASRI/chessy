import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

//icon
import { Icon } from "@iconify/react";
import { stoneIcons } from "src/assets/icons/stoneIcons";
import { memo, useCallback } from "react";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { hideDialog } from "src/core/store/reducer/dialog";
import { map } from "lodash";

const StoneOption = () => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback((e) => {
    dispatch(hideDialog());

    //TODO: change the stone of the board
    //TODO: dispatch logs
    // setBoard((prev) => {
    //   const newState = [...prev];
    //   newState[dest_i][dest_j].stone.type = e;
    //   return newState;
    // });
  }, []);

  return (
    <>
      {map(stoneIcons, (stone, key) => (
        <IconButton onClick={() => handleClick(key)}>
          <Icon icon={stone} />
        </IconButton>
      ))}
    </>
  );
};

interface Props {
  open: boolean;
}
function ReplacePawnDialog({ open }: Props) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">replace pawn stone</DialogTitle>
      <DialogContent>{StoneOption}</DialogContent>
    </Dialog>
  );
}
export default memo(ReplacePawnDialog);
