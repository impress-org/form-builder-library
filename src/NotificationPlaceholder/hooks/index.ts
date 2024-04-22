import {useEffect, useState} from 'react';

declare const window: {
    GiveNotifications: {
        apiNonce: string;
    };
} & Window;

interface NotificationState {
    isLoading: boolean;
    notifications: string[];
}

/**
 * Fetch notifications from session storage or server
 */
const fetchNotifications = async () => {
    //Session storage
    const notifications = JSON.parse(sessionStorage.getItem('give_notifications')) || [];

    if (notifications.length > 0) {
        return notifications;
    }

    // Server
    const response = await fetch('/wp-json/give-api/v2/get-notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.GiveNotifications.apiNonce
        }
    })

    const data = response.ok ? await response.json() : [];

    if (data.length > 0) {
        sessionStorage.setItem('give_notifications', JSON.stringify(data));
    }

    return data;
}

/**
 * Dismiss a notification
 */
const dismissNotification = async (id: string) => {
    const response = await fetch('/wp-json/give-api/v2/dismiss-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.GiveNotifications.apiNonce
        },
        body: JSON.stringify({notification: id})
    })

    const data = response.ok ? await response.json() : [];

    sessionStorage.setItem('give_notifications', JSON.stringify(data));

    return data;
};

/**
 * Hook
 */
export const useNotifications = (): [NotificationState, Function] => {
    const [state, setState] = useState<NotificationState>({
        isLoading: true,
        notifications: []
    });

    useEffect(() => {
        fetchNotifications().then((notifications) => {
            setState({
                isLoading: false,
                notifications
            });
        });
    }, []);

    return [
        state,
        (id: string) => {
            dismissNotification(id).then((notifications) => {
                setState({
                    isLoading: false,
                    notifications
                });
            })
        }
    ];
}
