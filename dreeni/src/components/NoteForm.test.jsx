import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createNote = vi.fn()

  render(<NoteForm createNote={createNote} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(inputs[0], 'testing a form...')
  await user.click(sendButton)
  console.log(createNote.mock.calls)
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
