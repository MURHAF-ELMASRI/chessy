import { useMemo } from "react";
import { Typography, Snackbar } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import { NotificationTypes } from "src/types/NotificationTypes";
import { ActionLessNotificationTypes } from "src/types/ActionLessNotificationTypes";
import { useEffect } from "react";
import { hideNotification } from "src/core/store/reducer/notification";
import { useAppDispatch } from "src/hooks/useAppDispatch";

interface Props {
  notificationType: NotificationTypes;
  content?: string;
}

const ActionLessNotification = ({ notificationType, content }: Props) => {
  const dispatch = useAppDispatch();
  const isOpen = useMemo(() => {
    return ["success", "error", "warning", "info"].includes(notificationType);
  }, [notificationType]);

  useEffect(() => {
    if (isOpen) setTimeout(() => dispatch(hideNotification()), 2000);
  }, [isOpen]);

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={
          (notificationType as ActionLessNotificationTypes) || undefined
        }
      >
        <Typography>{content}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default ActionLessNotification;
