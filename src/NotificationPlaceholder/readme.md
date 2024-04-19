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
                        <p>Notification content</p>
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
