import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { userType } from "../../types";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Icon } from "@iconify/react";
import windowClose from "@iconify-icons/mdi/window-close";

import useWebSocket from "../../core/store/services/webSocket";

import knight from "@iconify-icons/fa-solid/chess-knight";
import useNotification from "../../core/store/reducer/notification";
import useDialog from "../../core/store/reducer/choseStoneColorDialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },

  avatar: {
    backgroundColor: "#FFC83D",
  },
  bottom: {},
}));
//what to display in notification*


//TODO: handle the stop case
function UserInfo({ user, setOpen, setKeep }) {
  const classes = useStyle();
  const { webSocket } = useWebSocket();
  const { setNoti, noti } = useNotification();
  const { setDialogState } = useDialog();
  function handlePlay() {
    //show chose stone color dialog
    setKeep(false);
  }

  return (
    <Card
      onMouseEnter={() => setKeep(true)}
      onMouseLeave={() => setKeep(false)}
      className={classes.root}
    >
      <CardHeader
        avatar={
          user.photoURL ? (
            <Avatar src={user.photoURL} alt={user.displayName} />
          ) : (
            <Avatar className={classes.avatar}>
              {user.displayName && user.displayName[0]}
            </Avatar>
          )
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
            disabled={noti.severity === "info" && noti.open}
            onClick={() => handlePlay()}
            color="primary"
            variant="contained"
          >
            play
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

UserInfo.prototype = {
  user: userType,
};

export default UserInfo;
