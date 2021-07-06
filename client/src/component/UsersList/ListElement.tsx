import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  Badge,
  Tooltip,
} from "@material-ui/core";
import UserAvatar from "../UserAvatar";
import UserPopup from "./UserPopup";
import { User } from "@type/User";

const stateColor = {
  online: "#4caf50",
  offline: "#f44336",
  busy: "#ff9800",
};

interface Props {
  user: User;
}

const ListElement: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [keep, setKeep] = useState(false);

  //TODO : put the list Item in the top of component and if it works get it outside

  return (
    <Tooltip
      title={<UserPopup setOpen={setOpen} setKeep={setKeep} user={user} />}
      placement="right"
      interactive
      arrow
      open={open || keep}
    >
      <Button
        className={classes.listItemContainer}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ListItem className={classes.listItem}>
          <Grid container>
            <Grid item>
              <ListItemAvatar>
                <ListItemIcon>
                  <Badge
                    style={{ backgroundColor: stateColor[user.state] }}
                    variant="dot"
                  >
                    <UserAvatar
                      displayName={user.displayName}
                      photoURL={user.photoURL}
                    />
                  </Badge>
                </ListItemIcon>
              </ListItemAvatar>
            </Grid>
            <Grid item>
              <ListItemText>{user.displayName}</ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </Button>
    </Tooltip>
  );
};

export default ListElement;

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1),
    width: "100%",
  },
  logInGrid: {
    height: "100%",
    width: "100%",
  },
  listItemContainer: {
    width: "100%",
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.divider,
    borderRadius: 0,
  },
  item: {
    width: "100%",
  },
  container: {
    width: "100%",
  },
}));
