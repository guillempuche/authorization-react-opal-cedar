import { createContext, useState, useContext, useCallback } from 'react'
import { IStatusMessage, IQuote } from './types'

interface GlobalStateContextType {
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  quotes: IQuote[]
  setQuotes: React.Dispatch<React.SetStateAction<IQuote[]>>
  statusMessages: IStatusMessage[]
  removeStatusMessage: (id: number) => void
  addStatusMessage: (message: IStatusMessage) => void
}

const GlobalStateContext = createContext<GlobalStateContextType>({
  user: 'visitor',
  setUser: () => {},
  quotes: [],
  setQuotes: () => {},
  statusMessages: [],
  removeStatusMessage: () => {},
  addStatusMessage: () => {},
})

type GlobalStateProviderProps = { children: React.ReactNode }

// Define a provider component
export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [user, setUser] = useState('visitor')
  const [quotes, setQuotes] = useState<IQuote[]>([])
  const [statusMessages, setStatusMessages] = useState<IStatusMessage[]>([])

  // Function to remove a message by its ID
  const removeStatusMessage = useCallback((id: number) => {
    setStatusMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    )
  }, [])

  const addStatusMessage = useCallback((message: IStatusMessage) => {
    setStatusMessages((prevMessages) => [...prevMessages, message])
  }, [])

  const value = {
    user,
    setUser,
    quotes,
    setQuotes,
    statusMessages,
    removeStatusMessage,
    addStatusMessage,
  }

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalStateContext = () => useContext(GlobalStateContext)
