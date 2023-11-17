import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        updateAnectode(state, action) {
            const id = action.payload.id

            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }

})

export const { appendAnecdote, updateAnectode, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const updatedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        await anecdoteService.edit(updatedAnecdote)
        dispatch(updateAnectode(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer
