import { useAppSelector } from "@hooks/useAppSelector";
import { ActionNotification } from "@type/ActionNotificationTypes";
import { useCallback } from "react";
import WaitingNotification from "./WaitingNotification";

const ActionNotification = () => {
  const notificationType = useAppSelector(
    (state) => state.notification.notificationType
  );

  const shouldNotificationShow = useCallback(
    (type: string) => type === notificationType,
    [notificationType]
  );

  return (
    <>
      <WaitingNotification open={shouldNotificationShow(notificationType)} />
    </>
  );
};

export default ActionNotification;
