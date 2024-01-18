import { useEffect } from 'react'

import { useGlobalStateContext } from '../global_state'
import { IStatusMessage } from '../types'

interface FloatingMessageProps {
  statusMessage: IStatusMessage
}

const FloatingMessage = ({ statusMessage }: FloatingMessageProps) => {
  const { removeStatusMessage } = useGlobalStateContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeStatusMessage(statusMessage.id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [statusMessage, removeStatusMessage])

  return (
    <div className="bg-black bg-opacity-70 text-white p-2 mb-2 rounded-lg shadow-md">
      {statusMessage.text}
    </div>
  )
}

export const FloatingMessages: React.FC = () => {
  const { statusMessages } = useGlobalStateContext()

  return (
    <div className="fixed bottom-0 right-0 p-4 flex flex-col items-end">
      {statusMessages.map((message) => (
        <FloatingMessage key={message.id} statusMessage={message} />
      ))}
    </div>
  )
}
