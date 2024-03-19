import { INotification, NotificationType } from "./interface";
import store from "../../../redux-store";
import { useEffect, useRef, useState } from "react";
import { closeNotificationAction } from "../../../store/Notification";
import { Typography } from "antd";
import "./index.css";
import {
    CheckCircleOutlined,
    FireOutlined,
    InfoCircleOutlined,
    WarningOutlined,
} from "@ant-design/icons";

const NotificationIcon: React.FC<{ type: NotificationType }> = ({ type }) => {
    switch (type) {
        case NotificationType.SUCCESS:
            return <CheckCircleOutlined style={{ color: "#4caf50" }} />;
        case NotificationType.INFO:
            return <InfoCircleOutlined style={{ color: "#2196f3" }} />;
        case NotificationType.WARNING:
            return <WarningOutlined style={{ color: "#ff9800" }} />;
        case NotificationType.ERROR:
            return <FireOutlined style={{ color: "#f44336" }} />;
    }
};

const Notification: React.FC<INotification> = (notification: INotification) => {
    const TimerRef = useRef(null);
    const lastTimeRef = useRef(0);

    useEffect(() => {
        let timer: any;
        let interval: any;
        let lastCalled = new Date();
        if (notification?.timer) {
            timer = setTimeout(closeNotification, notification.timer * 1000);

            interval = setInterval(() => {
                const differenceTime =
                    new Date().getTime() - lastCalled.getTime();
                const tempTime = lastTimeRef.current + differenceTime;
                lastTimeRef.current = tempTime;
                const originalTime =
                    1 - tempTime / ((notification.timer as number) * 1000);
                (
                    TimerRef?.current as unknown as HTMLElement
                )?.style?.setProperty("--progress", originalTime + "");
                lastCalled = new Date();
            }, 10);
        }
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    const closeNotification = () => {
        store.dispatch(closeNotificationAction({ id: notification.id }));
    };

    return (
        <div className={`notification ${notification.type}`} ref={TimerRef}>
            <NotificationIcon type={notification.type} />

            <div className="ml-2">
                <Typography.Text>{notification.message}</Typography.Text>
            </div>
            <div className="close-icon" onClick={closeNotification}></div>
        </div>
    );
};

const NotificationList: React.FC = () => {
    const [notifications, setNotifications] = useState(
        store.getState().NotificationStore.notifications
    );

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setNotifications(store.getState().NotificationStore.notifications);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const visibleNotifications = notifications.filter(
        (notification) => !notification.read
    );

    return (
        <>
            {visibleNotifications.map((notification) => {
                return <Notification {...notification} key={notification.id} />;
            })}
        </>
    );
};

export default NotificationList;
