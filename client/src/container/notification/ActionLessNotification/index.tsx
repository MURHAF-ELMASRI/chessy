import { Typography, Snackbar } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";

import { ActionLessNotification } from "@type/ActionLessNotificationTypes";
import { hideNotification } from "@store/reducer/notification";

const ActionLessNotification = ({ open }: { open: boolean }) => {
  const dispatch = useAppDispatch();
  const [content, notificationType] = useAppSelector((state) => [
    state.notification.content,
    state.notification.notificationType,
  ]);

  useEffect(() => {
    if (open) setTimeout(() => dispatch(hideNotification()), 3000);
  }, [open]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={notificationType as ActionLessNotification}
      >
        <Typography>{content}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default ActionLessNotification;
