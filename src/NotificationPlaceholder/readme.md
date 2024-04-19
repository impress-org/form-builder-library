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
                render={dismissNotification => (
                    <div>
                        <p>Notification content</p>
                        <button onClick={dismissNotification}>Dismiss</button>
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
