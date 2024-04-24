import {useState} from 'react';

declare const window: {
    givewpNotifications: {
        apiNonce: string;
        notifications: {
            user: string[];
            system: string[];
        };
    };
} & Window;

export type NotificationType = 'user' | 'system';

/**
 * Dismiss a notification
 */
const dismissNotification = async (id: string, type: NotificationType) => {
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

    return response.ok ? await response.json() : [];
};

/**
 * Hook
 */
export const useNotifications = (type: NotificationType): [Array<string>, Function] => {
    const [notifications, setNotifications] = useState(
        window.givewpNotifications.notifications[type]
    );

    return [
        notifications,
        (id: string) => {
            dismissNotification(id, type).then((notifications) => {
                setNotifications(notifications);
            });
        },
    ];
};
