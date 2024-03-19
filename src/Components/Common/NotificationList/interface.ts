export enum NotificationType {
    WARNING = "warning",
    ERROR = "error",
    INFO = "info",
    SUCCESS = "success",
}

export interface INotification {
    readonly id: string;
    readonly message: string;
    readonly type: NotificationType;
    readonly closable: boolean;
    readonly timer?: number;
    read: boolean;
}

export interface INotificationDetail {}
