import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        changeNotification(state, action) {
            state.push(action.payload)
        },
        removeNotification(state, action) {
            return state.filter(item => item.id !== action.payload)
        }
    }
})

export const { changeNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return dispatch => {
        const notification = {
            content: content,
            id: getId()
        }
        dispatch(changeNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification(notification.id))
        }, time * 1000)
    }
}

export default notificationSlice.reducer