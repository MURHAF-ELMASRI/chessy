import WaitingNotification from "./WaitingNotification";
import { NotificationTypes } from "src/types/NotificationTypes";

interface Props {
  notificationType: NotificationTypes;
}

const ActionNotification = ({ notificationType }: Props) => {
  return (
    <>
      <WaitingNotification open={notificationType === "wait"} />
    </>
  );
};

export default ActionNotification;
