import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload)
        },
        voteAnectode(state, action) {
            const id = action.payload
            const anecdoteToVote = state.find(anecdote => anecdote.id === id)

            const changedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }

            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }

})

export const { createAnecdote, voteAnectode, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export default anecdoteSlice.reducer
