import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import PropTypes from 'prop-types'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`Vote added to: "${anecdote.content}"`, 5))

    }
    return (
        <div >
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

Anecdote.propTypes = {
    anecdote: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        votes: PropTypes.number.isRequired,
    }).isRequired,
}

const AnecdoteList = () => {
    const [anecdotes, filter] = useSelector(state => {
        return [state.anecdotes, state.filter]
    })

    let filteredAnecdotes = anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    }

    )
    filteredAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            )}
        </div>
    )
}

export default AnecdoteList