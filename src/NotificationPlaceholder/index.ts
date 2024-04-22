import {MouseEventHandler} from 'react';
import {useNotifications} from './hooks';

interface NotificationProps {
    id: string;
    render: (dismiss: MouseEventHandler) => JSX.Element
}

export default ({id, render}: NotificationProps) => {
    const [{isLoading, notifications}, dismissNotification] = useNotifications();

    if (isLoading || notifications.includes(id)) {
        return null;
    }

    return render(() => {
        dismissNotification(id)
    });
}
