import AnecdoteForm from './components/AnecdoteForm'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnectode } from './reducers/anecdoteReducer'

const App = () => {
    let anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnectode(id))
    }



    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteForm />
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default App