import { useCallback } from 'react'
import { API_BASE_URL } from './constants'
import { useGlobalStateContext } from './global_state'

export const useFetchUserQuotes = () => {
  const { addStatusMessage, setQuotes, user } = useGlobalStateContext()

  // const fetchQuotes = async () => {
  const fetchQuotes = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      if (!response.ok) {
        const errorResponse = await response.json()
        addStatusMessage({
          id: Date.now(),
          text: `Error: ${errorResponse.message || 'Failed to fetch quotes'}`,
        })
        return
      }
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.error('Error fetching quotes:', error)

      error instanceof Error
        ? addStatusMessage({
            id: Date.now(),
            text: `Error: ${error.message}`,
          })
        : addStatusMessage({
            id: Date.now(),
            text: 'An unknown error occurred',
          })
    }
  }, [])

  return fetchQuotes
}
