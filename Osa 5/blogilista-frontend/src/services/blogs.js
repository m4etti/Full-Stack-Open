import axios from 'axios'
const baseUrl = '/api/blogs'

const tokenConfig = (token) => (
    { headers: { Authorization: `Bearer ${token}` } }
)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newPost, token) => {
    const config = tokenConfig(token)

    const response = await axios.post(baseUrl, newPost, config)
    return response.data
}

const like = async (blog, token) => {
    const config = tokenConfig(token)

    const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 }, config)
    return response
}

const remove = async (blog, token) => {
    const config = tokenConfig(token)

    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response
}

export default { getAll, create, like, remove }