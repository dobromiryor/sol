import { Notification } from "../atoms/Notification";

interface TrendNotificationProps {
  trend: "increasing" | "deacreasing";
}

export const TrendNotification = ({ trend }: TrendNotificationProps) => {
  return (
    <a href='#daily-forecast'>
      <Notification
        icon={trend === "increasing" ? "trending_up" : "trending_down"}
        content={`Temperature trending ${
          trend === "increasing" ? "up" : "down"
        } in the next 3 days`}
      />
    </a>
  );
};
