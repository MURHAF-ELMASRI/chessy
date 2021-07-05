import ActionNotification from "./ActionNotification";
import ActionLessNotification from "./ActionLessNotification";

import { useAppSelector } from "@hooks/useAppSelector";
import { isActionLessNotification } from "./isActionLessNotification";

export const Notification = () => {
  //we can get rid of some useAppSelector in the child if we pass props to them
  const notificationType = useAppSelector(
    (state) => state.notification.notificationType
  );

  return (
    <>
      <ActionLessNotification
        open={isActionLessNotification(notificationType)}
      />
      <ActionNotification />
    </>
  );
};
