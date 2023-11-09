import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNew from './CreateNew'

const createNewBlog = jest.fn()

beforeEach(() => {
    render(<CreateNew createNewBlog={createNewBlog} />)
})

test('Form submit calls createNewBlog with rigth data', async () => {
    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('Title:')
    const authorInput = screen.getByLabelText('Author:')
    const urlInput = screen.getByLabelText('Url:')
    const createButton = screen.getByText('Create')

    await user.type(authorInput, 'testaaja')
    await user.type(titleInput, 'testi')
    await user.type(urlInput, 'url')
    await user.click(createButton)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog).toHaveBeenCalledWith('testi', 'testaaja', 'url')
})