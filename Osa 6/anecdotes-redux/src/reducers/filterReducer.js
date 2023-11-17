import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_FILTER': {
//             return action.payload
//         }
//     }
//     return state
// }

// export const changeFilter = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         payload: filter
//     }
// }

// export default filterReducer



const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        changeFilter(state, action) {
            return action.payload
        }
    }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer