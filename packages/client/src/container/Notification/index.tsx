import ActionNotification from "./ActionNotification";
import ActionLessNotification from "./ActionLessNotification";

import { useAppSelector } from "src/hooks/useAppSelector";

export const Notification = () => {
  //we can get rid of some useAppSelector in the child if we pass props to them
  const [notificationType, content] = useAppSelector((state) => [
    state.notification.notificationType,
    state.notification.content,
  ]);

  return (
    <>
      <ActionLessNotification
        content={content}
        notificationType={notificationType}
      />
      <ActionNotification notificationType={notificationType} />
    </>
  );
};

export default Notification;
