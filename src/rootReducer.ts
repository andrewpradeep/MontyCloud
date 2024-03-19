import { combineReducers } from "redux";
import NotificationStore from "./store/Notification";

const rootReducer = combineReducers({ NotificationStore });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
