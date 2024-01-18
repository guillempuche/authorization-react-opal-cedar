import { useState, FormEvent } from 'react'
import { useGlobalStateContext } from '../global_state'

export const Input = () => {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const { addStatusMessage, user } = useGlobalStateContext()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // POST request to server
    try {
      const response = await fetch('/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          author,
          private: isPrivate,
          creator: user,
        }),
      })
      if (!response.ok) {
        const errorResponse = await response.json()
        addStatusMessage({
          id: Date.now(),
          text: `Error: ${errorResponse.message || 'Failed to send quote'}`,
        })
        return
      }
      // Handle success - maybe update global state or show a success message
    } catch (error) {
      if (error instanceof Error) {
        addStatusMessage({
          id: Date.now(),
          text: `Error: ${error.message}`,
        })
      } else {
        addStatusMessage({
          id: Date.now(),
          text: 'An unknown error occurred',
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quote"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author name"
      />
      <label>
        Private
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
