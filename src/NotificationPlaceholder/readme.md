## Notification types
There are two notification types, `user` and `system`.
User type notifications when dismissed, won't be shown again only to the user that dismissed the notification, while system notifications when dismissed, won't be shown again to any user.
You will probably use `user` type notifications 99% of the time, but sometimes in some special cases like upgrade action that can be done only once for all users, you might want to use `system` type notifications.

## Usage

```jsx
import {NotificationPlaceholder} from '@givewp/form-builder-library';

function App() {
    return (
        <div>
            <h1>
                My app title
            </h1>
            <NotificationPlaceholder
                id="notificationUniqueId"
                render={dismiss => (
                    <div>
                        <p>User notification - if dismissed it won't be shown again to this user only.</p>
                        <button onClick={dismiss}>Dismiss</button>
                    </div>
                )}
            />

            <NotificationPlaceholder
                id="sysNotificationUniqueId"
                type="system"
                render={dismiss => (
                    <div>
                        <p>System notification - if dismissed it won't be shown again to any user.</p>
                        <button onClick={dismiss}>Dismiss</button>
                    </div>
                )}
            />

            <div>
                My app content
            </div>
        </div>
    );

}
```
