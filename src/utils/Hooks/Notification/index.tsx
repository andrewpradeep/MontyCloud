import { createRoot } from "react-dom/client";
import NotificationList from "../../../Components/Common/NotificationList";
import { INotification } from "../../../Components/Common/NotificationList/interface";
import {
    clearAllNotificationAction,
    closeNotificationAction,
    pushNotificationAction,
} from "../../../store/Notification";
import store from "../../../redux-store";

let NotificationUIElement: HTMLElement | null = null;

const useNotification = () => {
    const init = () => {
        return new Promise((resolve) => {
            if (!NotificationUIElement) {
                NotificationUIElement = document.createElement("div");
                NotificationUIElement.id = "notification_container";
                document.body.append(NotificationUIElement);

                const NotificationRoot = createRoot(NotificationUIElement);
                NotificationRoot.render(<NotificationList />);
            }
            resolve(true);
        });
    };

    const pushNotification = async (notification: INotification) => {
        await init();
        store.dispatch(pushNotificationAction(notification));
    };

    const closeNotification = (id: string) => {
        store.dispatch(closeNotificationAction({ id }));
    };

    const clearAll = () => {
        store.dispatch(clearAllNotificationAction());
    };

    return {
        push: pushNotification,
        clearAll,
        close: closeNotification,
    };
};

export default useNotification;
