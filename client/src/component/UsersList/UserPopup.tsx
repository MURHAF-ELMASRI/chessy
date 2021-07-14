import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserAvatar from "../UserAvatar";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

import { useAppSelector } from "src/hooks/useAppSelector";
import { showChooseStoneColorDialog } from "src/core/store/reducer/dialog";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { User } from "src/types/User";

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },

  avatar: {
    backgroundColor: "#FFC83D",
  },
}));

interface Props {
  user: User;
  setOpen: (arg0: boolean) => void;
  setKeep: (arg0: boolean) => void;
}

//TODO: handle the stop case

const UserInfo: React.FC<Props> = ({ user, setKeep }) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();

  const notificationType = useAppSelector(
    (state) => state.notification.notificationType
  );

  const handlePlay = useCallback(() => {
    dispatch(showChooseStoneColorDialog({ opponentUID: user.uid }));
    setKeep(false);
  }, []);

  return (
    <Card
      onMouseEnter={() => setKeep(true)}
      onMouseLeave={() => setKeep(false)}
      className={classes.root}
    >
      <CardHeader
        avatar={
          <UserAvatar photoURL={user.photoURL} displayName={user.displayName} />
        }
        title={user.displayName ? user.displayName : ""}
        subheader={user.email ? user.email : ""}
      />
      <CardContent>
        <Typography>
          win : &nbsp;&nbsp; {user.win ? user.win : " - "}
        </Typography>
        <Typography>
          tie : &nbsp;&nbsp; &nbsp; {user.tie ? user.tie : " - "}
        </Typography>
        <Typography>lose : &nbsp; {user.lose ? user.lose : " - "}</Typography>
      </CardContent>
      <CardActions>
        {user.state === "online" && (
          <Button
            disabled={notificationType === "wait"}
            onClick={handlePlay}
            color="primary"
            variant="contained"
          >
            play
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default UserInfo;
