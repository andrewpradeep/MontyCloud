import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../Components/Common/NotificationList/interface";

export enum ACTIONS {
    PUSH,
    CLOSE,
}

const initialState = {
    notifications: [] as INotification[],
};

const NotificationSlice = createSlice({
    name: "NotificationStore",
    initialState,
    reducers: {
        pushNotificationAction(state, action: PayloadAction<INotification>) {
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        },
        closeNotificationAction(state, action: PayloadAction<{ id: string }>) {
            state.notifications.forEach((notification) => {
                if (notification.id === action.payload.id) {
                    notification.read = true;
                }
            });

            return state;
        },
        clearAllNotificationAction(state) {
            return {
                ...state,
                notifications: [],
            };
        },
    },
});

export const {
    pushNotificationAction,
    closeNotificationAction,
    clearAllNotificationAction,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
