import { useAppSelector } from "@hooks/useAppSelector";
import { memo } from "react";

import ReplacePawnDialog from "./ReplacePawnDialog";
import RequestPlayDialog from "./RequestPlayDialog";
import ChooseStoneColorDialog from "./ChooseStoneColorDialog";
import { DialogType } from "@type/DialogTypes";
import CancelConfirmationDialog from "./CancelConfirmationDialog";

function DialogComponent() {
  const dialogType = useAppSelector((state) => state.dialog.dialogType);

  function shouldDialogOpen(type: DialogType) {
    return type === dialogType;
  }
  return (
    <>
      <ReplacePawnDialog open={shouldDialogOpen("replacePawn")} />
      <RequestPlayDialog open={shouldDialogOpen("requestPlay")} />
      <ChooseStoneColorDialog open={shouldDialogOpen("chooseStoneColor")} />
      <CancelConfirmationDialog open={shouldDialogOpen("cancelConfirmation")} />
    </>
  );
}
export default memo(DialogComponent);
