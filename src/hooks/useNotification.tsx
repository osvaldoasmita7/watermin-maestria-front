import { NotificationArgsProps, notification } from "antd";

export const useNotification = () => {
  type NotificationPlacement = NotificationArgsProps["placement"];
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
      duration: 10,
    });
  };
  return { openNotification, contextHolder };
};
