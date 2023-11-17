import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Welcome',
    reducer: {
        cahngeNotification(state, action) {
            return action.payload
        }
    }
})

export const { cahngeNotification } = notificationSlice.actions
export default notificationSlice.reducer