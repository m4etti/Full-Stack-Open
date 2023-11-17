import { useSelector } from 'react-redux'

const Notification = () => {
    const notifications = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
    }
    return (
        <div>
            {notifications.map(notification => (
                <div key={notification.id} style={style}>
                    {notification.content}
                </div>
            ))}
        </div>
    )
}
export default Notification