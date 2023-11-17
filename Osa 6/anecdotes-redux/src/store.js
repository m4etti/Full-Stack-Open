import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationreducer from './reducers/notificationreducer'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationreducer
    }
})

export default store