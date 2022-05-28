import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { IconButton } from "@material-ui/core";
import { showCancelConfirmationDialog } from "src/core/store/reducer/dialog";
import { useCallback } from "react";
import firebase from "firebase";
import { InlineIcon } from "@iconify/react";
import logoutVariant from "@iconify-icons/mdi/logout-variant";
import { disconnectWithServer } from "src/core/store/reducer/gameState";

// TODO delete make make style if logout icon works
// const useStyle=makeStyles(()=>({
//     logoutIcon: {
//         "&:hover": {
//           cursor: "pointer",
//         },
// }))

const LogOutButton: React.FC = () => {
  const isPlaying = useAppSelector((state) => state.gameState.isPlaying);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (isPlaying) dispatch(showCancelConfirmationDialog());
    else firebase.auth().signOut();

    dispatch(disconnectWithServer());
  }, []);
  return (
    <IconButton onClick={handleClick}>
      <InlineIcon width={30} icon={logoutVariant} />
    </IconButton>
  );
};

export default LogOutButton;
