import {useEffect, useState} from 'react';

declare const window: {
    givewpNotifications: {
        apiNonce: string;
    };
} & Window;

interface NotificationState {
    isLoading: boolean;
    notifications: string[];
}

export type StorageType = 'user' | 'system';

/**
 * Fetch notifications
 */
const fetchNotifications = async (type: StorageType) => {
    //local storage
    const notifications = JSON.parse(localStorage.getItem(`give_notifications_${type}`)) || [];

    if (notifications.length > 0) {
        return notifications;
    }

    // Server
    const response = await fetch(`/wp-json/give-api/v2/get-notifications?type=${type}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.givewpNotifications.apiNonce,
        },
    });

    const data = response.ok ? await response.json() : [];

    localStorage.setItem(`give_notifications_${type}`, JSON.stringify(data));

    return data;
};

/**
 * Dismiss a notification
 */
const dismissNotification = async (id: string, type: StorageType) => {
    const response = await fetch('/wp-json/give-api/v2/dismiss-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.givewpNotifications.apiNonce,
        },
        body: JSON.stringify({
            notification: id,
            type
        }),
    });

    const data = response.ok ? await response.json() : [];

    localStorage.setItem(`give_notifications_${type}`, JSON.stringify(data));

    return data;
};

/**
 * Hook
 */
export const useNotifications = (type: StorageType): [NotificationState, Function] => {
    const [state, setState] = useState<NotificationState>({
        isLoading: true,
        notifications: [],
    });

    useEffect(() => {
        fetchNotifications(type).then((notifications) => {
            setState({
                isLoading: false,
                notifications,
            });
        });
    }, []);

    return [
        state,
        (id: string) => {
            dismissNotification(id, type).then((notifications) => {
                setState({
                    ...state,
                    notifications,
                });
            });
        },
    ];
};
