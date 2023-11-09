import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const removeBlog = jest.fn()
const addLike = jest.fn()
const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 1,
    user: { username: 'username' },
}
const user = {
    username: 'username'
}

beforeEach(() => {
    render(<Blog blog={blog} addLike={addLike} user={user} removeBlog={removeBlog} />)
})

test('At start only title visible', () => {
    const titleElement = screen.getByText('title')
    const authorElement = screen.getByText('author')
    const urlElement = screen.getByText('url')
    const likesElement = screen.getByText('Likes: 1')

    expect(titleElement).toBeVisible()
    expect(authorElement).not.toBeVisible()
    expect(urlElement).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
})

test('after clicking the button, everything is visible', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const titleElement = screen.getByText('title')
    const authorElement = screen.getByText('author')
    const urlElement = screen.getByText('url')
    const likesElement = screen.getByText('Likes: 1')

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
})

test('After 2x like press addLike is called 2 times', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('Like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(addLike.mock.calls.length).toBe(2)
})