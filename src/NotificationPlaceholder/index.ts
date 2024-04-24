import {MouseEventHandler} from 'react';
import {useNotifications, StorageType} from './hooks';

interface NotificationProps {
    id: string;
    render: (dismiss: MouseEventHandler) => JSX.Element,
    type: StorageType;
}

export default ({id, render, type = 'user'}: NotificationProps) => {
    const [{isLoading, notifications}, dismissNotification] = useNotifications(type);

    if (isLoading || notifications.includes(id)) {
        return null;
    }

    return render(() => {
        dismissNotification(id)
    });
}
