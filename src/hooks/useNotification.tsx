import { NotificationArgsProps, notification } from "antd";

export const useNotification = () => {
  type NotificationPlacement = NotificationArgsProps["placement"];
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, text: string) => {
    api.info({
      message: `Notification ${placement}`,
      description: text,
      placement,
      duration: 10,
    });
  };
  return { openNotification, contextHolder };
};
