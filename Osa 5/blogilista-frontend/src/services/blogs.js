import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newPost, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    const response = await axios.post(baseUrl, newPost, config)
    return response.data
}

export default { getAll, create }