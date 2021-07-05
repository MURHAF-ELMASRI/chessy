import { ActionLessNotificationTypes } from "@type/ActionLessNotificationTypes";

export const isActionLessNotification = (
  x: any
): x is ActionLessNotificationTypes =>
  ["success", "error", "warning", "info"].includes(x);
