import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'

const Notification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    useEffect(() => {
        let timer
        if (notification.showNotification) {
            timer = setTimeout(() => {
                dispatch(hideNotification())
            }, 5000)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [notification, dispatch])

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        display: notification.showNotification ? 'block' : 'none'
    }
    return (
        <div style={style}>

            {notification.content}
        </div>
    )
}
export default Notification