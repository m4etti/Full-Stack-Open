import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: 'Welcome',
    showNotification: true
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        changeNotification(state, action) {
            state.content = action.payload
            state.showNotification = true
        },
        hideNotification(state) {
            state.showNotification = false
        }
    }
})

export const { changeNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer