import { useAppSelector } from "src/hooks/useAppSelector";
import { memo } from "react";

import ReplacePawnDialog from "./ReplacePawnDialog";
import RequestPlayDialog from "./RequestPlayDialog";
import ChooseStoneColorDialog from "./ChooseStoneColorDialog";
import { DialogType } from "src/types/DialogTypes";
import CancelConfirmationDialog from "./CancelConfirmationDialog";

function DialogComponent() {
  const [dialogType, opponentName, opponentUID, opponentColor] = useAppSelector(
    (state) => [
      state.dialog.dialogType,
      state.dialog.opponentName,
      state.dialog.opponentUID,
      state.dialog.opponentColor,
    ]
  );

  function shouldDialogOpen(type: DialogType) {
    return type === dialogType;
  }
  return (
    <>
      <ReplacePawnDialog open={shouldDialogOpen("replacePawn")} />
      <RequestPlayDialog
        open={shouldDialogOpen("requestPlay")}
        opponent={{
          name: opponentName,
          uid: opponentUID,
          color: opponentColor,
        }}
      />
      <ChooseStoneColorDialog
        opponentUID={opponentUID}
        open={shouldDialogOpen("chooseStoneColor")}
      />
      <CancelConfirmationDialog open={shouldDialogOpen("cancelConfirmation")} />
    </>
  );
}
export default memo(DialogComponent);
