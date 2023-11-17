import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log(content)

        event.target.anecdote.value = ''
        console.log('add', content)

        dispatch(createAnecdote(content))
        dispatch(setNotification(`New anecdote added: "${content}"`, 5))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>

    )
}

export default AnecdoteForm
