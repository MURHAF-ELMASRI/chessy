import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { makeStyles, IconButton } from "@material-ui/core";
import { showCancelConfirmationDialog } from "@store/reducer/dialog";
import { useCallback } from "react";
import firebase from "firebase";
import { InlineIcon } from "@iconify/react";
import logoutVariant from "@iconify-icons/mdi/logout-variant";

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
  }, []);
  return (
    <IconButton onClick={handleClick}>
      <InlineIcon width={30} icon={logoutVariant} />
    </IconButton>
  );
};

export default LogOutButton;
