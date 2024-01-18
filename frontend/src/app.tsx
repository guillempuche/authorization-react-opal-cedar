import { useEffect } from 'react'

import { ContentArea, FloatingMessages, TopBar } from './components'
import { useFetchUserQuotes } from './hooks'

export const App = () => {
  const fetchUserQuotes = useFetchUserQuotes()

  useEffect(() => {
    fetchUserQuotes()
  }, [fetchUserQuotes])

  return (
    <div className="flex flex-col grow h-screen max-w-lg mx-auto px-6 py-4 space-y-4 bg-white dark:bg-black">
      <TopBar />
      <ContentArea />
      <div className="absolute bottom-0 right-0 p-4">
        <FloatingMessages />
      </div>
    </div>
  )
}
