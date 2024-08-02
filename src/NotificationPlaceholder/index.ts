import {MouseEventHandler} from 'react';
import {useNotifications, NotificationType} from './hooks';

interface NotificationProps {
    id: string;
    render: (dismiss: MouseEventHandler) => JSX.Element,
    type?: NotificationType;
}

export default ({id, render, type = 'user'}: NotificationProps) => {
    const [notifications, dismissNotification] = useNotifications(type);

    if (notifications.includes(id)) {
        return null;
    }

    return render(() => {
        dismissNotification(id)
    });
}
